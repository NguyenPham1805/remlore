import { Component, OnDestroy } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule,
  NbThemeService,
} from "@nebular/theme";

import { MatRipple } from "@angular/material/core";
import {
  Electricity,
  ElectricityChart,
  ElectricityData,
} from "@remlore/core/data/electricity";
import { forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { ElectricityChartComponent } from "./electricity-chart/electricity-chart.component";

@Component({
  selector: "rl-electricity",
  styleUrls: ["./electricity.component.scss"],
  templateUrl: "./electricity.component.html",
  imports: [
    ElectricityChartComponent,
    NbTabsetModule,
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbListModule,
    MatRipple,
  ],
})
export class ElectricityComponent implements OnDestroy {
  private alive = true;

  listData: Electricity[] = [];
  chartData: ElectricityChart[] = [];

  type = "week";
  types = ["week", "month", "year"];

  currentTheme!: string;
  themeSubscription: any;

  constructor(
    private electricityService: ElectricityData,
    private themeService: NbThemeService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });

    forkJoin([
      this.electricityService.getListData(),
      this.electricityService.getChartData(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        ([listData, chartData]: [Electricity[], ElectricityChart[]]) => {
          this.listData = listData;
          this.chartData = chartData;
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
