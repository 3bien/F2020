import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDriverQualifying } from '@f2020/data';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'f2020-qualifying-times',
  template: '{{times$ | async}}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualifyingTimesComponent {

  times$: Observable<string>;

  @Input()
  set qualifying(value: IDriverQualifying) {
    const times = ['q1', 'q2', 'q3']
      .map(q => `${q.toUpperCase()}: ${value[q] || 'Ingen tid'}`);
    this.times$ = interval(2000).pipe(
      map(count => count+1),
      startWith(0),
      map(count => times[count % 3]),
    );
  }
}
