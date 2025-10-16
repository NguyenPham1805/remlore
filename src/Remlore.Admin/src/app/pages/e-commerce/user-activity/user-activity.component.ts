import { Component, OnDestroy } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbThemeService,
} from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

import { MatRipple } from "@angular/material/core";
import { UserActive, UserActivityData } from "@remlore/core/data/user-activity";

@Component({
  selector: "rl-user-activity",
  styleUrls: ["./user-activity.component.scss"],
  templateUrl: "./user-activity.component.html",
  imports: [
    NbCardModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    MatRipple,
  ],
})
export class ECommerceUserActivityComponent implements OnDestroy {
  private alive = true;

  userActivity: UserActive[] = [];
  type = "month";
  types = ["week", "month", "year"];
  currentTheme!: string;

  constructor(
    private themeService: NbThemeService,
    private userActivityService: UserActivityData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });

    this.getUserActivity(this.type);
  }

  getUserActivity(period: string) {
    this.userActivityService
      .getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((userActivityData) => {
        this.userActivity = userActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
