import { Routes } from "@angular/router";

import { D3Component } from "./d3/d3.component";
import { EchartsComponent } from "./echarts/echarts.component";

export const charRoutes: Routes = [
  {
    path: "echarts",
    component: EchartsComponent,
  },
  {
    path: "d3",
    component: D3Component,
  },
];
