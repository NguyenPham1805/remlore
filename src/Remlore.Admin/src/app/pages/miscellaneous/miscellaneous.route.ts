import { Routes } from "@angular/router";

import { NotFoundComponent } from "./not-found/not-found.component";

export const miscellaneousRoutes: Routes = [
  {
    path: "404",
    component: NotFoundComponent,
  },
];
