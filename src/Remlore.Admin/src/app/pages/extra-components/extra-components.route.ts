import { Routes } from "@angular/router";

import { AlertComponent } from "./alert/alert.component";
import { CalendarKitFullCalendarShowcaseComponent } from "./calendar-kit/calendar-kit.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ChatComponent } from "./chat/chat.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { SpinnerComponent } from "./spinner/spinner.component";

export const extraComponentRoutes: Routes = [
  {
    path: "calendar",
    component: CalendarComponent,
  },
  {
    path: "progress-bar",
    component: ProgressBarComponent,
  },
  {
    path: "spinner",
    component: SpinnerComponent,
  },
  {
    path: "alert",
    component: AlertComponent,
  },
  {
    path: "calendar-kit",
    component: CalendarKitFullCalendarShowcaseComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  },
];
