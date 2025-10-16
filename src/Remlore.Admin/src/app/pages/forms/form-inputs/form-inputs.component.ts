import { Component, OnInit } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import {
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbThemeService,
} from "@nebular/theme";
import { Observable, tap } from "rxjs";

@Component({
  selector: "rl-form-inputs",
  styleUrls: ["./form-inputs.component.scss"],
  templateUrl: "./form-inputs.component.html",
  imports: [
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    MatRipple,
  ],
})
export class FormInputsComponent implements OnInit {
  materialTheme$!: Observable<boolean>;
  starRate = 2;
  heartRate = 4;
  radioGroupValue = "This is value 2";
  showMaterialInputs = false;

  constructor(private readonly themeService: NbThemeService) {}

  ngOnInit() {
    this.materialTheme$ = this.themeService.onThemeChange().pipe<any>(
      tap((theme) => {
        const themeName: string = theme?.name || "";
        this.showMaterialInputs = themeName.startsWith("material");
      })
    );
  }
}
