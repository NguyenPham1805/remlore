import { Routes } from "@angular/router";
import { DialogComponent } from "./dialog/dialog.component";
import { PopoversComponent } from "./popovers/popovers.component";
import { ToastrComponent } from "./toastr/toastr.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { WindowComponent } from "./window/window.component";

export const modalRoutes: Routes = [
  {
    path: "dialog",
    component: DialogComponent,
  },
  {
    path: "window",
    component: WindowComponent,
  },
  {
    path: "popover",
    component: PopoversComponent,
  },
  {
    path: "tooltip",
    component: TooltipComponent,
  },
  {
    path: "toastr",
    component: ToastrComponent,
  },
];
