import { Component } from '@angular/core';

@Component({
  selector: 'sha-card-page',
  template: `
    <div fxLayout="row" fxLayoutAlign="center stretch">
      <div fxFlex.xs="90" fxLayout.gt-xs="row" fxLayout="column" fxLayoutGap="16px" style="margin-top: 16px">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent {

}
