import { Component } from "@angular/core";
import { NbCardModule } from "@nebular/theme";
import { ProfitBarAnimationChartData } from "@remlore/core/data/profit-bar-animation-chart";
import { takeWhile } from "rxjs/operators";
import { StatsBarAnimationChartComponent } from "./stats-bar-animation-chart.component";

@Component({
  selector: "rl-stats-card-front",
  styleUrls: ["./stats-card-front.component.scss"],
  templateUrl: "./stats-card-front.component.html",
  imports: [NbCardModule, StatsBarAnimationChartComponent],
})
export class StatsCardFrontComponent {
  private alive = true;

  linesData!: { firstLine: number[]; secondLine: number[] };

  constructor(
    private profitBarAnimationChartService: ProfitBarAnimationChartData
  ) {
    this.profitBarAnimationChartService
      .getChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((linesData) => {
        this.linesData = linesData;
      });
  }
}
