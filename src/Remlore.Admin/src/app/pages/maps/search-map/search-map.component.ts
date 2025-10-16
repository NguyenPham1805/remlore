import { Component } from "@angular/core";
import { NbCardModule } from "@nebular/theme";
import { PositionModel } from "./entity/position.model";
import { MapComponent } from "./map/map.component";
import { SearchComponent } from "./search/search.component";

@Component({
  selector: "rl-search-map",
  templateUrl: "./search-map.component.html",
  imports: [NbCardModule, SearchComponent, MapComponent],
})
export class SearchMapComponent {
  searchedPosition: PositionModel = new PositionModel();

  setPosition(position: PositionModel) {
    this.searchedPosition = position;
  }
}
