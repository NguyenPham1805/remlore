import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { PagesComponent } from "./pages.component";

export const pageRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.route").then((r) => r.layoutRoutes),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.route").then((r) => r.formRoutes),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import("./ui-features/ui-features.route").then(
            (r) => r.uiFeatureRoutes
          ),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.route").then(
            (r) => r.modalRoutes
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.route").then(
            (r) => r.extraComponentRoutes
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.route").then((r) => r.mapRoutes),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.route").then((r) => r.charRoutes),
      },
      {
        path: "editors",
        loadComponent: () =>
          import("./editors/ckeditor.component").then(
            (c) => c.CKEditorComponent
          ),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.route").then((r) => r.tableRoutes),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.route").then(
            (r) => r.miscellaneousRoutes
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];
