import { Component } from '@angular/core';

@Component({
    selector: 'ngx-earning-card',
    styleUrls: ['./earning-card.component.scss'],
    templateUrl: './earning-card.component.html',
    standalone: false
})
export class EarningCardComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
