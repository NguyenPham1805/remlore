import { Component, OnDestroy } from "@angular/core";
import { NbCardModule, NbThemeService } from "@nebular/theme";
import {
  OutlineData,
  VisitorsAnalyticsData,
} from "@remlore/core/data/visitors-analytics";
import { forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { NgxLegendItemColor } from "../legend-chart/enum.legend-item-color";
import { ECommerceLegendChartComponent } from "../legend-chart/legend-chart.component";
import { SlideOutComponent } from "../slide-out/slide-out.component";
import { ECommerceVisitorsAnalyticsChartComponent } from "./visitors-analytics-chart/visitors-analytics-chart.component";
import { ECommerceVisitorsStatisticsComponent } from "./visitors-statistics/visitors-statistics.component";

@Component({
  selector: "rl-ecommerce-visitors-analytics",
  styleUrls: ["./visitors-analytics.component.scss"],
  templateUrl: "./visitors-analytics.component.html",
  imports: [
    ECommerceLegendChartComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    SlideOutComponent,
    ECommerceVisitorsStatisticsComponent,
    NbCardModule,
  ],
})
export class ECommerceVisitorsAnalyticsComponent implements OnDestroy {
  private alive = true;

  pieChartValue!: number;
  chartLegend: { iconColor: NgxLegendItemColor; title: string }[] = [];
  visitorsAnalyticsData!: { innerLine: number[]; outerLine: OutlineData[] };

  constructor(
    private themeService: NbThemeService,
    private visitorsAnalyticsChartService: VisitorsAnalyticsData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.setLegendItems(theme.variables?.visitorsLegend);
      });

    forkJoin([
      this.visitorsAnalyticsChartService.getInnerLineChartData(),
      this.visitorsAnalyticsChartService.getOutlineLineChartData(),
      this.visitorsAnalyticsChartService.getPieChartData(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        ([innerLine, outerLine, pieChartValue]: [
          number[],
          OutlineData[],
          number
        ]) => {
          this.visitorsAnalyticsData = {
            innerLine: innerLine,
            outerLine: outerLine,
          };

          this.pieChartValue = pieChartValue;
        }
      );
  }

  setLegendItems(visitorsLegend: any): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend?.firstIcon,
        title: "Unique Visitors",
      },
      {
        iconColor: visitorsLegend?.secondIcon,
        title: "Page Views",
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
