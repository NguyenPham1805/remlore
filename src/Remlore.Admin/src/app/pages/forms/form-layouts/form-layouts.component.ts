import { Component } from "@angular/core";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
} from "@nebular/theme";

@Component({
  selector: "rl-form-layouts",
  styleUrls: ["./form-layouts.component.scss"],
  templateUrl: "./form-layouts.component.html",
  imports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbRadioModule,
  ],
})
export class FormLayoutsComponent {}
