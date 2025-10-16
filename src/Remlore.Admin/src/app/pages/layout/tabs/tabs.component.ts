import { Component } from "@angular/core";
import {
  NbCardModule,
  NbRouteTabsetModule,
  NbTabsetModule,
} from "@nebular/theme";

@Component({
  selector: "rl-tab1",
  template: `
    <p>
      Early home automation began with labor-saving machines. Self-contained
      electric or gas powered
      <a target="_blank" href="https://en.wikipedia.org/wiki/Home_appliances"
        >home appliances</a
      >
      became viable in the 1900s with the introduction of
      <a
        target="_blank"
        href="https://en.wikipedia.org/wiki/Electric_power_distribution"
        >electric power distribution
      </a>
      and led to the introduction of washing machines (1904), water heaters
      (1889), refrigerators, sewing machines, dishwashers, and clothes dryers.
    </p>
  `,
})
export class Tab1Component {}

@Component({
  selector: "rl-tab2",
  template: ` <p>Tab 2 works!</p> `,
})
export class Tab2Component {}

@Component({
  selector: "rl-tabs",
  styleUrls: ["./tabs.component.scss"],
  templateUrl: "./tabs.component.html",
  imports: [NbCardModule, NbRouteTabsetModule, NbTabsetModule],
})
export class TabsComponent {
  tabs: any[] = [
    {
      title: "Route tab #1",
      route: "/pages/layout/tabs/tab1",
    },
    {
      title: "Route tab #2",
      route: "/pages/layout/tabs/tab2",
    },
  ];
}
