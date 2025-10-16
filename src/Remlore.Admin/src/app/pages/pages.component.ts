import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NB_WINDOW, NbMenuModule } from "@nebular/theme";
import { OneColumnLayoutComponent } from "@remlore/theme/layouts";
import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "rl-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <rl-one-column>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </rl-one-column>
  `,
  imports: [OneColumnLayoutComponent, NbMenuModule, RouterOutlet],
  providers: [{ provide: NB_WINDOW, useValue: window }],
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
