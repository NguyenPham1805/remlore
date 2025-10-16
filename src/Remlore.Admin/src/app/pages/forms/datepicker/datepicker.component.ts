import { Component } from "@angular/core";
import {
  NbCardModule,
  NbDatepickerModule,
  NbDateService,
  NbInputModule,
} from "@nebular/theme";

@Component({
  selector: "rl-datepicker",
  templateUrl: "datepicker.component.html",
  styleUrls: ["datepicker.component.scss"],
  imports: [NbCardModule, NbInputModule, NbDatepickerModule],
})
export class DatepickerComponent {
  min: Date;
  max: Date;

  constructor(protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
  }
}
