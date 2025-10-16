import { Component, OnDestroy } from "@angular/core";
import { NbCardModule, NbIconModule, NbThemeService } from "@nebular/theme";

@Component({
  selector: "rl-kitten",
  styleUrls: ["./kitten.component.scss"],
  templateUrl: "./kitten.component.html",
  imports: [NbCardModule, NbIconModule],
})
export class KittenComponent implements OnDestroy {
  currentTheme!: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
