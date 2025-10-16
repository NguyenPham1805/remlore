import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbCardModule,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from "@nebular/theme";
import { CountryOrderData } from "@remlore/core/data/country-order";
import { takeWhile } from "rxjs/operators";
import { CountryOrdersChartComponent } from "./chart/country-orders-chart.component";
import { CountryOrdersMapComponent } from "./map/country-orders-map.component";

@Component({
  selector: "rl-country-orders",
  styleUrls: ["./country-orders.component.scss"],
  templateUrl: "./country-orders.component.html",
  imports: [
    NbCardModule,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
  ],
})
export class CountryOrdersComponent implements OnInit, OnDestroy {
  private alive = true;

  countryName = "";
  countryData: number[] = [];
  countriesCategories: string[] = [];
  breakpoint: NbMediaBreakpoint = { name: "", width: 0 };
  breakpoints: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private countryOrderService: CountryOrderData
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
  }

  ngOnInit() {
    this.themeService
      .onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService
      .getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;

    this.countryOrderService
      .getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countryData = countryData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
