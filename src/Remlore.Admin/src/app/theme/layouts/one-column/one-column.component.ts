import { Component } from "@angular/core";
import { NbLayoutModule, NbSidebarModule } from "@nebular/theme";
import { FooterComponent, HeaderComponent } from "@remlore/theme/components";

@Component({
  selector: "rl-one-column",
  styleUrls: ["./one-column.component.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <rl-header></rl-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <rl-footer></rl-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
  imports: [HeaderComponent, FooterComponent, NbSidebarModule, NbLayoutModule],
})
export class OneColumnLayoutComponent {}
