import { Component, OnDestroy } from "@angular/core";
import { NbCardModule, NbSelectModule, NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

import { MatRipple } from "@angular/material/core";
import { TrafficChartData } from "@remlore/core/data/traffic-chart";
import { TrafficChartComponent } from "./traffic-chart.component";

@Component({
  selector: "rl-traffic",
  styleUrls: ["./traffic.component.scss"],
  template: `
    <nb-card size="tiny">
      <nb-card-header>
        <span>Traffic Consumption</span>

        <nb-select matRipple [(selected)]="type">
          @for(t of type; track t) {
          <nb-option matRipple [value]="t">{{ t }}</nb-option>
          }
        </nb-select>
      </nb-card-header>

      <rl-traffic-chart [points]="trafficChartPoints"></rl-traffic-chart>
    </nb-card>
  `,
  imports: [NbCardModule, NbSelectModule, TrafficChartComponent, MatRipple],
})
export class TrafficComponent implements OnDestroy {
  private alive = true;

  trafficChartPoints: number[] = [];
  type = "month";
  types = ["week", "month", "year"];
  currentTheme!: string;

  constructor(
    private themeService: NbThemeService,
    private trafficChartService: TrafficChartData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });

    this.trafficChartService
      .getTrafficChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.trafficChartPoints = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
