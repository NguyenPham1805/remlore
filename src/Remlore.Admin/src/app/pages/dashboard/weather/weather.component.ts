import { Component } from "@angular/core";
import { NbCardModule, NbIconModule } from "@nebular/theme";

@Component({
  selector: "rl-weather",
  styleUrls: ["./weather.component.scss"],
  templateUrl: "./weather.component.html",
  imports: [NbCardModule, NbIconModule],
})
export class WeatherComponent {}
