import { Component } from "@angular/core";
import { NbCalendarKitModule, NbCardModule } from "@nebular/theme";
import { CalendarKitMonthCellComponent } from "./month-cell/month-cell.component";

@Component({
  selector: "rl-calendar-kit",
  templateUrl: "calendar-kit.component.html",
  styleUrls: ["calendar-kit.component.scss"],
  imports: [NbCardModule, NbCalendarKitModule],
})
export class CalendarKitFullCalendarShowcaseComponent {
  month = new Date();
  monthCellComponent = CalendarKitMonthCellComponent;
}
