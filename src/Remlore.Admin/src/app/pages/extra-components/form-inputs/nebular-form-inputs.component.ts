import { Component } from "@angular/core";
import { NebularSelectComponent } from "./nebular-select/nebular-select.component";

@Component({
  selector: "rl-nebular-form-inputs",
  templateUrl: "nebular-form-inputs.component.html",
  styleUrls: ["nebular-form-inputs.component.scss"],
  imports: [NebularSelectComponent],
})
export class NebularFormInputsComponent {}
