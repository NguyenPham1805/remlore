import { Component } from "@angular/core";
import { NbCardModule, NbIconModule } from "@nebular/theme";
import { StatsCardBackComponent } from "./back-side/stats-card-back.component";
import { StatsCardFrontComponent } from "./front-side/stats-card-front.component";

@Component({
  selector: "rl-profit-card",
  styleUrls: ["./profit-card.component.scss"],
  templateUrl: "./profit-card.component.html",
  imports: [
    StatsCardFrontComponent,
    StatsCardBackComponent,
    NbCardModule,
    NbIconModule,
  ],
})
export class ProfitCardComponent {
  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
