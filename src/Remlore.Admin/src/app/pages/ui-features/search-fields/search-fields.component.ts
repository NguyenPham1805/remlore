import { Component } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { NbCardModule, NbSearchModule } from "@nebular/theme";

@Component({
  selector: "rl-search-fields",
  templateUrl: "search-fields.component.html",
  imports: [NbCardModule, NbSearchModule, MatRipple],
})
export class SearchComponent {}
