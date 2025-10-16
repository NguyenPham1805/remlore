import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { NbCardModule, NbThemeService } from "@nebular/theme";
import { EChartsOption, graphic, SeriesOption } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";
import { delay } from "rxjs/operators";

@Component({
  selector: "rl-solar",
  styleUrls: ["./solar.component.scss"],
  templateUrl: "./solar.component.html",
  imports: [NbCardModule, NgxEchartsModule],
})
export class SolarComponent implements AfterViewInit, OnDestroy {
  private value = 0;

  @Input()
  set chartValue(value: number) {
    this.value = value;

    if (this.option) {
      const series = this.option.series as any[];
      series[0].data[0].value = value;
      series[0].data[1].value = 100 - value;
      series[1].data[0].value = value;
    }
  }

  option!: EChartsOption;
  themeSubscription: any;
  private echartsInstance: any;

  constructor(private theme: NbThemeService) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme
      .getJsTheme()
      .pipe(delay(1))
      .subscribe((config) => {
        const solarTheme: any = config.variables?.solar;

        if (!this.option) {
          this.option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            series: [
              {
                name: " ",
                clockwise: true,
                emphasis: { scale: false },
                type: "pie",
                center: ["45%", "50%"],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value,
                    name: " ",
                    label: {
                      position: "center",
                      formatter: "{d}%",
                      fontSize: 22,
                      fontFamily: config.variables?.fontSecondary,
                      fontWeight: 600,
                      color: config.variables?.fgHeading,
                    },
                    tooltip: {
                      show: false,
                    },
                    itemStyle: {
                      color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: solarTheme.gradientLeft },
                        { offset: 1, color: solarTheme.gradientRight },
                      ]),
                      shadowColor: solarTheme.shadowColor,
                      shadowBlur: 0,
                      shadowOffsetX: 0,
                      shadowOffsetY: 3,
                    },
                  },
                  {
                    value: 100 - this.value,
                    name: " ",
                    tooltip: {
                      show: false,
                    },
                    label: { position: "inner" },
                    itemStyle: { color: solarTheme.secondSeriesFill },
                  },
                ],
              },
              {
                name: " ",
                clockwise: true,
                emphasis: { scale: false },
                type: "pie",
                center: ["45%", "50%"],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value,
                    name: " ",
                    label: { position: "inner", show: false },
                    tooltip: {
                      show: false,
                    },
                    itemStyle: {
                      color: new graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: solarTheme.gradientLeft },
                        { offset: 1, color: solarTheme.gradientRight },
                      ]),
                      shadowColor: solarTheme.shadowColor,
                      shadowBlur: 7,
                    },
                  },
                  {
                    value: 28,
                    name: " ",
                    label: { position: "inner" },
                    itemStyle: { color: "none" },
                  },
                ],
              },
            ] as SeriesOption[],
          };
        }
      });
  }

  onChartInit(echarts: any) {
    // Keep reference to dispose on destroy to avoid double init warning
    this.echartsInstance = echarts;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    if (this.echartsInstance) {
      this.echartsInstance.dispose();
      this.echartsInstance = null;
    }
  }
}
