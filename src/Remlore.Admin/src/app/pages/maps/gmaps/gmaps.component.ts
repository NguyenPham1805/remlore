import { Component } from "@angular/core";
import { GoogleMap, MapMarker } from "@angular/google-maps";
import { NbCardModule } from "@nebular/theme";

@Component({
  selector: "rl-gmaps",
  styleUrls: ["./gmaps.component.scss"],
  templateUrl: "./gmaps.component.html",
  imports: [NbCardModule, GoogleMap, MapMarker],
})
export class GmapsComponent {
  readonly position = { lat: 51.678418, lng: 7.809007 };
}
