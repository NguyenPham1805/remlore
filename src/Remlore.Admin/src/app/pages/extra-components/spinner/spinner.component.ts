import { Component } from "@angular/core";
import { SpinnerColorComponent } from "./spinner-color/spinner-color.component";
import { SpinnerInButtonsComponent } from "./spinner-in-buttons/spinner-in-buttons.component";
import { SpinnerInTabsComponent } from "./spinner-in-tabs/spinner-in-tabs.component";
import { SpinnerSizesComponent } from "./spinner-sizes/spinner-sizes.component";

@Component({
  selector: "rl-spinner",
  templateUrl: "spinner.component.html",
  styleUrls: ["spinner.component.scss"],
  imports: [
    SpinnerSizesComponent,
    SpinnerColorComponent,
    SpinnerInButtonsComponent,
    SpinnerInTabsComponent,
  ],
})
export class SpinnerComponent {
  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 3000);
  }
}
