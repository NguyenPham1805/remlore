import { Routes } from "@angular/router";
import {
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { CallbackComponent } from "./callback.component";

export const authRoutes: Routes = [
  {
    path: "",
    component: NbLoginComponent,
  },
  {
    path: "callback",
    component: CallbackComponent,
  },
  {
    path: "login",
    component: NbLoginComponent,
  },
  {
    path: "register",
    component: NbRegisterComponent,
  },
  {
    path: "logout",
    component: NbLogoutComponent,
  },
  {
    path: "request-password",
    component: NbRequestPasswordComponent,
  },
  {
    path: "reset-password",
    component: NbResetPasswordComponent,
  },
];
