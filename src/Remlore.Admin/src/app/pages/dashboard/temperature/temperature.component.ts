import { NgClass } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatRipple } from "@angular/material/core";
import {
  NbCardModule,
  NbRadioModule,
  NbTabsetModule,
  NbThemeService,
} from "@nebular/theme";
import {
  Temperature,
  TemperatureHumidityData,
} from "@remlore/core/data/temperature-humidity";
import { RoundPipe } from "@remlore/theme/pipes";
import { forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { TemperatureDraggerComponent } from "./temperature-dragger/temperature-dragger.component";

@Component({
  selector: "rl-temperature",
  styleUrls: ["./temperature.component.scss"],
  templateUrl: "./temperature.component.html",
  imports: [
    TemperatureDraggerComponent,
    RoundPipe,
    NbCardModule,
    NbTabsetModule,
    NbRadioModule,
    NgClass,
    FormsModule,
    MatRipple,
  ],
})
export class TemperatureComponent implements OnDestroy {
  private alive = true;

  temperatureData!: Temperature;
  temperature!: number;
  temperatureOff = false;
  temperatureMode = "cool";

  humidityData!: Temperature;
  humidity!: number;
  humidityOff = false;
  humidityMode = "heat";

  theme: any;
  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private temperatureHumidityService: TemperatureHumidityData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        this.theme = config.variables?.temperature;
      });

    forkJoin([
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    ]).subscribe(
      ([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
