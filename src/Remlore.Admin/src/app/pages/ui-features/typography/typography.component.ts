import { Component, OnDestroy } from "@angular/core";
import {
  NbAlertModule,
  NbCardModule,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from "@nebular/theme";

@Component({
  selector: "rl-typography",
  styleUrls: ["./typography.component.scss"],
  templateUrl: "./typography.component.html",
  imports: [NbCardModule, NbAlertModule],
})
export class TypographyComponent implements OnDestroy {
  breakpoint!: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService
      .onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
