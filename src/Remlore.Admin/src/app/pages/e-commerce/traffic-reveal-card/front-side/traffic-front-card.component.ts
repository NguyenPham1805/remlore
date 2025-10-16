import { Component, Input, OnDestroy } from "@angular/core";
import { NbIconModule, NbListModule, NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

import { NgClass } from "@angular/common";
import { TrafficList } from "@remlore/core/data/traffic-list";
import { TrafficBarComponent } from "./traffic-bar/traffic-bar.component";

@Component({
  selector: "rl-traffic-front-card",
  styleUrls: ["./traffic-front-card.component.scss"],
  templateUrl: "./traffic-front-card.component.html",
  imports: [TrafficBarComponent, NbListModule, NbIconModule, NgClass],
})
export class TrafficFrontCardComponent implements OnDestroy {
  private alive = true;

  @Input() frontCardData: TrafficList[] = [];

  currentTheme!: string;

  constructor(private themeService: NbThemeService) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
