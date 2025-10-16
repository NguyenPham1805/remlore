import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NbCardModule } from "@nebular/theme";

@Component({
  selector: "ngx-material-inputs",
  templateUrl: "./material-inputs.component.html",
  styleUrls: ["./material-inputs.component.scss"],
  imports: [
    NbCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
})
export class MaterialInputsComponent {}
