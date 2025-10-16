import { NgClass } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { SolarData } from "@remlore/core/data/solar";
import { takeWhile } from "rxjs/operators";
import { ContactsComponent } from "./contacts/contacts.component";
import { ElectricityComponent } from "./electricity/electricity.component";
import { KittenComponent } from "./kitten/kitten.component";
import { RoomsComponent } from "./rooms/rooms.component";
import { SecurityCamerasComponent } from "./security-cameras/security-cameras.component";
import { SolarComponent } from "./solar/solar.component";
import { StatusCardComponent } from "./status-card/status-card.component";
import { TemperatureComponent } from "./temperature/temperature.component";
import { TrafficComponent } from "./traffic/traffic.component";
import { WeatherComponent } from "./weather/weather.component";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "rl-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
  imports: [
    TemperatureComponent,
    ElectricityComponent,
    StatusCardComponent,
    RoomsComponent,
    ContactsComponent,
    SolarComponent,
    KittenComponent,
    TrafficComponent,
    WeatherComponent,
    SecurityCamerasComponent,
    NgClass,
  ],
})
export class DashboardComponent implements OnDestroy {
  private alive = true;

  solarValue!: number;
  lightCard: CardSettings = {
    title: "Light",
    iconClass: "nb-lightbulb",
    type: "primary",
  };
  rollerShadesCard: CardSettings = {
    title: "Roller Shades",
    iconClass: "nb-roller-shades",
    type: "success",
  };
  wirelessAudioCard: CardSettings = {
    title: "Wireless Audio",
    iconClass: "nb-audio",
    type: "info",
  };
  coffeeMakerCard: CardSettings = {
    title: "Coffee Maker",
    iconClass: "nb-coffee-maker",
    type: "warning",
  };

  statusCards: CardSettings[] = [];

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: Record<string, CardSettings[]> = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: "warning",
      },
      {
        ...this.rollerShadesCard,
        type: "primary",
      },
      {
        ...this.wirelessAudioCard,
        type: "danger",
      },
      {
        ...this.coffeeMakerCard,
        type: "info",
      },
    ],
    dark: this.commonStatusCardsSet,
    "material-dark": this.commonStatusCardsSet,
    "material-light": this.commonStatusCardsSet,
  };

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService
      .getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
