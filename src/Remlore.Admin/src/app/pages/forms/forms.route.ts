import { Routes } from "@angular/router";

import { ButtonsComponent } from "./buttons/buttons.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { FormInputsComponent } from "./form-inputs/form-inputs.component";
import { FormLayoutsComponent } from "./form-layouts/form-layouts.component";

export const formRoutes: Routes = [
  {
    path: "inputs",
    component: FormInputsComponent,
  },
  {
    path: "layouts",
    component: FormLayoutsComponent,
  },
  {
    path: "layouts",
    component: FormLayoutsComponent,
  },
  {
    path: "buttons",
    component: ButtonsComponent,
  },
  {
    path: "datepicker",
    component: DatepickerComponent,
  },
];
