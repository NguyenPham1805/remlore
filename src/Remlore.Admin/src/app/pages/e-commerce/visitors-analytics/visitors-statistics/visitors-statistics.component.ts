import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { LayoutService } from "@remlore/core/utils/layout.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EChartsOption, graphic } from "echarts";
import { ECharts } from "echarts/core";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";
import { NgxLegendItemColor } from "../../legend-chart/enum.legend-item-color";
import { ECommerceLegendChartComponent } from "../../legend-chart/legend-chart.component";

@Component({
  selector: "rl-visitors-statistics",
  styleUrls: ["./visitors-statistics.component.scss"],
  templateUrl: "./visitors-statistics.component.html",
  imports: [ECommerceLegendChartComponent, NgxEchartsModule, NgxChartsModule],
})
export class ECommerceVisitorsStatisticsComponent
  implements AfterViewInit, OnDestroy
{
  private alive = true;

  @Input() value!: number;

  option!: EChartsOption;
  chartLegend: { iconColor: NgxLegendItemColor; title: string }[] = [];
  echartsInstance!: ECharts;

  constructor(
    private theme: NbThemeService,
    private layoutService: LayoutService
  ) {
    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme
      .getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const variables: any = config.variables;
        const visitorsPieLegend: any = config.variables?.visitorsPieLegend;

        if (!this.echartsInstance) {
          this.setOptions(variables);
          this.setLegendItems(visitorsPieLegend);
        }
      });
  }

  setLegendItems(visitorsPieLegend: any) {
    this.chartLegend = [
      {
        iconColor: visitorsPieLegend?.firstSection,
        title: "New Visitors",
      },
      {
        iconColor: visitorsPieLegend?.secondSection,
        title: "Return Visitors",
      },
    ];
  }

  setOptions(variables: any) {
    const visitorsPie: any = variables.visitorsPie;

    this.option = {
      tooltip: {
        trigger: "item",
        formatter: "",
      },
      series: [
        {
          name: " ",
          clockwise: true,
          emphasis: { scale: false },
          type: "pie",
          center: ["50%", "50%"],
          radius: visitorsPie?.firstPieRadius,
          data: [
            {
              value: this.value,
              name: " ",
              label: {
                position: "center",
                formatter: "",
                fontSize: 22,
                fontFamily: variables.fontSecondary,
                fontWeight: 600,
                color: variables.fgHeading,
              },
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: visitorsPie?.firstPieGradientLeft },
                  { offset: 1, color: visitorsPie?.firstPieGradientRight },
                ]),
                shadowColor: visitorsPie?.firstPieShadowColor,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
              },
            },
            {
              value: 100 - this.value,
              name: " ",
              label: { position: "inner" },
              itemStyle: { color: variables.layoutBg },
            },
          ],
        },
        {
          name: " ",
          clockwise: true,
          emphasis: { scale: false },
          type: "pie",
          center: ["50%", "50%"],
          radius: visitorsPie?.secondPieRadius,
          data: [
            {
              value: this.value,
              name: " ",
              label: {
                position: "center",
                formatter: "",
                fontSize: 22,
                fontFamily: variables.fontSecondary,
                fontWeight: 600,
                color: variables.fgHeading,
              },
              itemStyle: { color: new graphic.LinearGradient(0, 0, 0, 1) },
            },
            {
              value: 100 - this.value,
              name: " ",
              label: { position: "inner" },
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: visitorsPie?.secondPieGradientLeft },
                  { offset: 1, color: visitorsPie?.secondPieGradientRight },
                ]),
                shadowColor: visitorsPie?.secondPieShadowColor,
                shadowBlur: 0,
                shadowOffsetX: visitorsPie?.shadowOffsetX,
                shadowOffsetY: visitorsPie?.shadowOffsetY,
              },
            },
          ],
        },
      ],
    };
  }

  onChartInit(echarts: ECharts) {
    this.echartsInstance = echarts;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
