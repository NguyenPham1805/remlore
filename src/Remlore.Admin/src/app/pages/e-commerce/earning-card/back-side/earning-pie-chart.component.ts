import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { graphic } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "rl-earning-pie-chart",
  styleUrls: ["./earning-card-back.component.scss"],
  template: `
    <div
      echarts
      class="echart"
      [options]="options"
      (chartInit)="onChartInit($event)"
      (chartClick)="onChartClick($event)"
    ></div>
  `,
  imports: [NgxEchartsModule],
})
export class EarningPieChartComponent implements AfterViewInit, OnDestroy {
  @Output() selectPie = new EventEmitter<{
    value: number;
    name: string;
    color: string;
  }>();
  @Input() values: { value: number; name: string }[] = [];
  @Input() defaultSelectedCurrency!: string;

  private alive = true;

  options!: EChartsOption;
  echartsInstance: any;

  constructor(private theme: NbThemeService) {}

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

  onChartClick(event: any) {
    const pieData = {
      value: event.value,
      name: event.name,
      color: event.color.colorStops[0].color,
    };

    this.emitSelectPie(pieData);
  }

  emitSelectPie(pieData: { value: number; name: string; color: any }) {
    this.selectPie.emit(pieData);
  }

  ngAfterViewInit() {
    this.theme
      .getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const variables = config.variables;

        if (!this.echartsInstance) {
          this.options = this.getOptions(variables);
          this.setDefaultSelectedData();
        }
      });
  }

  setDefaultSelectedData() {
    const series: any = this.options.series;

    const defaultSelectedData = series[0].data.find(
      (item: any) => item.name === this.defaultSelectedCurrency
    );
    if (!defaultSelectedData) return;

    const color = defaultSelectedData.itemStyle.color.colorStops[0].color;
    const pieData = {
      value: defaultSelectedData.value,
      name: defaultSelectedData.name,
      color,
    };

    this.emitSelectPie(pieData);
  }

  getOptions(variables: any): EChartsOption {
    const earningPie: any = variables.earningPie;

    return {
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
          center: earningPie?.center,
          radius: earningPie?.radius,
          data: [
            {
              value: this.values[0].value,
              name: this.values[0].name,
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
                  { offset: 0, color: earningPie?.firstPieGradientLeft },
                  { offset: 1, color: earningPie?.firstPieGradientRight },
                ]),
                shadowColor: earningPie?.firstPieShadowColor,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
              },
            },
            {
              value: this.values[1].value,
              name: this.values[1].name,
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
                  { offset: 0, color: earningPie?.secondPieGradientLeft },
                  { offset: 1, color: earningPie?.secondPieGradientRight },
                ]),
                shadowColor: earningPie?.secondPieShadowColor,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
              },
            },
            {
              value: this.values[2].value,
              name: this.values[2].name,
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
                  { offset: 0, color: earningPie?.thirdPieGradientLeft },
                  { offset: 1, color: earningPie?.thirdPieGradientRight },
                ]),
                shadowColor: earningPie?.thirdPieShadowColor,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 3,
              },
            },
          ],
        },
      ],
    };
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
