import { Routes } from "@angular/router";
import { NbAuthComponent } from "@nebular/auth";
import { authRoutes } from "./auth/auth.route";

export const appRoutes: Routes = [
  {
    path: "pages",
    loadChildren: () => import("./pages/pages.route").then((m) => m.pageRoutes),
  },
  {
    path: "auth",
    component: NbAuthComponent,
    children: authRoutes,
    // children: [
    //   {
    //     path: "callback",
    //     component: CallbackComponent,
    //   },
    //   {
    //     path: "login",
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: "register",
    //     component: NbRegisterComponent,
    //   },
    //   {
    //     path: "logout",
    //     component: NbLogoutComponent,
    //   },
    //   {
    //     path: "request-password",
    //     component: NbRequestPasswordComponent,
    //   },
    //   {
    //     path: "reset-password",
    //     component: NbResetPasswordComponent,
    //   },
    // ],
    // loadChildren: () => import("./auth/auth.route").then((m) => m.authRoutes),
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];
