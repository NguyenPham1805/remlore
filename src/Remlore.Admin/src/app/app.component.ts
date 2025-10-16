/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AnalyticsService } from "@remlore/core/utils/analytics.service";
import { SeoService } from "@remlore/core/utils/seo.service";

@Component({
  selector: "rl-app",
  template: "<router-outlet></router-outlet>",
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
