import { Component, Input, OnInit } from "@angular/core";
import { GoogleMap, MapMarker } from "@angular/google-maps";
import { PositionModel } from "../entity/position.model";

@Component({
  selector: "rl-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
  imports: [GoogleMap, MapMarker],
})
export class MapComponent implements OnInit {
  position: PositionModel | null = null;
  zoom: number = 1;

  @Input()
  public set searchedPosition(position: PositionModel) {
    if (position) {
      this.position = position;
      this.zoom = 12;
    }
  }

  ngOnInit() {
    // set up current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchedPosition = new PositionModel(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }
}
