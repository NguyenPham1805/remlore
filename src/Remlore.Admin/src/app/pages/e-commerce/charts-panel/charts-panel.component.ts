import { Component, OnDestroy, ViewChild } from "@angular/core";
import { takeWhile } from "rxjs/operators";

import { NbCardModule, NbTabsetModule } from "@nebular/theme";
import { OrdersChart } from "@remlore/core/data/orders-chart";
import {
  OrderProfitChartSummary,
  OrdersProfitChartData,
} from "@remlore/core/data/orders-profit-chart";
import { ProfitChart } from "@remlore/core/data/profit-chart";
import { ChartPanelHeaderComponent } from "./chart-panel-header/chart-panel-header.component";
import { ChartPanelSummaryComponent } from "./chart-panel-summary/chart-panel-summary.component";
import { OrdersChartComponent } from "./charts/orders-chart.component";
import { ProfitChartComponent } from "./charts/profit-chart.component";

@Component({
  selector: "rl-ecommerce-charts",
  styleUrls: ["./charts-panel.component.scss"],
  templateUrl: "./charts-panel.component.html",
  imports: [
    NbCardModule,
    NbTabsetModule,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ChartPanelHeaderComponent,
    ProfitChartComponent,
  ],
})
export class ECommerceChartsPanelComponent implements OnDestroy {
  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[] = [];
  period: string = "week";
  ordersChartData!: OrdersChart;
  profitChartData!: ProfitChart;

  @ViewChild("ordersChart", { static: true })
  ordersChart!: OrdersChartComponent;
  @ViewChild("profitChart", { static: true })
  profitChart!: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData) {
    this.ordersProfitChartService
      .getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab: any) {
    if (selectedTab.tabTitle === "Profit") {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService
      .getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((ordersChartData) => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService
      .getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((profitChartData) => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
