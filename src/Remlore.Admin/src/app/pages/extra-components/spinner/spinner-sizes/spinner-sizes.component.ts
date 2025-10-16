import { Component } from "@angular/core";
import { NbCardModule, NbSpinnerModule } from "@nebular/theme";

@Component({
  selector: "rl-spinner-sizes",
  templateUrl: "spinner-sizes.component.html",
  imports: [NbCardModule, NbSpinnerModule],
})
export class SpinnerSizesComponent {}
