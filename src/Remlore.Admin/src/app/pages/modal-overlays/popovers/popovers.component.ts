import { Component } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import {
  NbButtonModule,
  NbCardModule,
  NbPopoverModule,
  NbTabsetModule,
} from "@nebular/theme";
import {
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from "./popover-examples.component";

@Component({
  selector: "rl-popovers",
  styleUrls: ["./popovers.component.scss"],
  templateUrl: "./popovers.component.html",
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbTabsetModule,
    NbButtonModule,
    MatRipple,
  ],
})
export class PopoversComponent {
  tabsComponent = NgxPopoverTabsComponent;
  cardComponent = NgxPopoverCardComponent;
  formComponent = NgxPopoverFormComponent;
}
