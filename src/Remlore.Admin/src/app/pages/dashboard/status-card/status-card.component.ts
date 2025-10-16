import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { NbCardModule } from "@nebular/theme";

@Component({
  selector: "rl-status-card",
  styleUrls: ["./status-card.component.scss"],
  templateUrl: "./status-card.component.html",
  imports: [NbCardModule, NgClass, MatRipple],
})
export class StatusCardComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() on = true;
}
