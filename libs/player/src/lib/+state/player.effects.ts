import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, mapTo } from 'rxjs/operators';
import { PlayerActions } from './player.actions';
import { PlayerService } from '../service/player.service';
import { GoogleMessaging } from '@f2020/firebase';


@Injectable({
  providedIn: 'root',
})
export class PlayerEffects {

  loadPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayer),
      concatMap(() => this.service.player$.pipe(
        map(player => {
          if (player?.uid) {
            return PlayerActions.loadPlayerSuccess({ player });
          }
          return PlayerActions.loadPlayerUnauthorized();
        }),
        catchError(error => of(PlayerActions.loadPlayerFailure({ error }))),
      )),
    ),
  );  
  loadtoken$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.loadMessagingToken),
    concatMap(() => this.messaging.getToken()
    .then(token => PlayerActions.updatePlayer({token}))
    .catch(error => PlayerActions.loadMessingTokenFailure({error})
    ))
  ));
  updatePlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.updatePlayer),
      concatMap((partialPlayer) => this.service.updatePlayer(partialPlayer).pipe(
        mapTo(PlayerActions.updatePlayerSuccess({partialPlayer})),
        catchError(error => of(PlayerActions.updatePlayerFailure({ error }))),
      )),
    ),
  );
  logoutPlayer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.logoutPlayer),
      concatMap(action => this.service.signOut()
        .then(() => PlayerActions.logoutPlayerSuccess())
        .catch(error => PlayerActions.logoutPlayerFailure({ error })),
      ),
    ),
  );

  constructor(private actions$: Actions, private service: PlayerService, @Inject(GoogleMessaging) private messaging: firebase.messaging.Messaging) {
  }
}
