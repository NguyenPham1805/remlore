import { Component, OnDestroy } from "@angular/core";
import { NbCardModule } from "@nebular/theme";
import { EarningData, PieChart } from "@remlore/core/data/earning";
import { takeWhile } from "rxjs/operators";
import { EarningPieChartComponent } from "./earning-pie-chart.component";

@Component({
  selector: "rl-earning-card-back",
  styleUrls: ["./earning-card-back.component.scss"],
  templateUrl: "./earning-card-back.component.html",
  imports: [NbCardModule, EarningPieChartComponent],
})
export class EarningCardBackComponent implements OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[] = [];
  name!: string;
  color!: string;
  value!: number;
  defaultSelectedCurrency: string = "Bitcoin";

  constructor(private earningService: EarningData) {
    this.earningService
      .getEarningPieChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningPieChartData) => {
        this.earningPieChartData = earningPieChartData;
      });
  }

  changeChartInfo(pieData: { value: number; name: string; color: any }) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
