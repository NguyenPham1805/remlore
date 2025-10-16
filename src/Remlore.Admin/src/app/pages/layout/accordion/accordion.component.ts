import { Component, ViewChild } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
} from "@nebular/theme";

@Component({
  selector: "rl-accordion",
  templateUrl: "accordion.component.html",
  styleUrls: ["accordion.component.scss"],
  imports: [NbCardModule, NbButtonModule, NbAccordionModule, MatRipple],
})
export class AccordionComponent {
  @ViewChild("item", { static: true }) accordion!: any;

  toggle() {
    this.accordion.toggle();
  }
}
