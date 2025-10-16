import { Routes } from "@angular/router";

import { GridComponent } from "./grid/grid.component";
import { IconsComponent } from "./icons/icons.component";
import { SearchComponent } from "./search-fields/search-fields.component";
import { TypographyComponent } from "./typography/typography.component";

export const uiFeatureRoutes: Routes = [
  {
    path: "grid",
    component: GridComponent,
  },
  {
    path: "icons",
    component: IconsComponent,
  },
  {
    path: "typography",
    component: TypographyComponent,
  },
  {
    path: "search-fields",
    component: SearchComponent,
  },
];
