import { Component } from "@angular/core";
import { ECommerceChartsPanelComponent } from "./charts-panel/charts-panel.component";
import { CountryOrdersComponent } from "./country-orders/country-orders.component";
import { EarningCardComponent } from "./earning-card/earning-card.component";
import { ProfitCardComponent } from "./profit-card/profit-card.component";
import { ECommerceProgressSectionComponent } from "./progress-section/progress-section.component";
import { TrafficRevealCardComponent } from "./traffic-reveal-card/traffic-reveal-card.component";
import { ECommerceUserActivityComponent } from "./user-activity/user-activity.component";
import { ECommerceVisitorsAnalyticsComponent } from "./visitors-analytics/visitors-analytics.component";

@Component({
  selector: "rl-ecommerce",
  templateUrl: "./e-commerce.component.html",
  imports: [
    ProfitCardComponent,
    EarningCardComponent,
    TrafficRevealCardComponent,
    ECommerceChartsPanelComponent,
    CountryOrdersComponent,
    ECommerceProgressSectionComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceUserActivityComponent,
  ],
})
export class ECommerceComponent {}
