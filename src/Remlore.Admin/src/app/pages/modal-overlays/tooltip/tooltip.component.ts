import { Component } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { NbButtonModule, NbCardModule, NbTooltipModule } from "@nebular/theme";

@Component({
  selector: "rl-tooltip",
  templateUrl: "tooltip.component.html",
  styleUrls: ["tooltip.component.scss"],
  imports: [NbCardModule, NbTooltipModule, NbButtonModule, MatRipple],
})
export class TooltipComponent {}
