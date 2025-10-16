import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import {
  NbCardModule,
  NbIconModule,
  NbSelectModule,
  NbThemeService,
} from "@nebular/theme";
import { EarningData, LiveUpdateChart } from "@remlore/core/data/earning";
import { NumberWithCommasPipe } from "@remlore/theme/pipes";
import { interval, Subscription } from "rxjs";
import { switchMap, takeWhile } from "rxjs/operators";
import { EarningLiveUpdateChartComponent } from "./earning-live-update-chart.component";

@Component({
  selector: "rl-earning-card-front",
  styleUrls: ["./earning-card-front.component.scss"],
  templateUrl: "./earning-card-front.component.html",
  imports: [
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    EarningLiveUpdateChartComponent,
    NumberWithCommasPipe,
    MatRipple,
  ],
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  @Input() selectedCurrency: string = "Bitcoin";

  intervalSubscription!: Subscription;
  currencies: string[] = ["Bitcoin", "Tether", "Ethereum"];
  currentTheme!: string;
  earningLiveUpdateCardData!: LiveUpdateChart;
  liveUpdateChartData: { value: [string, number] }[] = [];

  constructor(
    private themeService: NbThemeService,
    private earningService: EarningData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit() {
    this.getEarningCardData(this.selectedCurrency);
  }

  changeCurrency(currency: string) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }
  }

  private getEarningCardData(currency: string) {
    this.earningService
      .getEarningCardData(currency)
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = earningLiveUpdateCardData;
        this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;

        this.startReceivingLiveData(currency);
      });
  }

  startReceivingLiveData(currency: string) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() =>
          this.earningService.getEarningLiveUpdateCardData(currency)
        )
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
