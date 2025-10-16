import { Component } from "@angular/core";
import { NbCardModule, NbProgressBarModule } from "@nebular/theme";
import { InteractiveProgressBarComponent } from "./interactive-progress-bar/interactive-progress-bar.component";

@Component({
  selector: "rl-progress-bar",
  templateUrl: "progress-bar.component.html",
  styleUrls: ["progress-bar.component.scss"],
  imports: [NbCardModule, NbProgressBarModule, InteractiveProgressBarComponent],
})
export class ProgressBarComponent {}
