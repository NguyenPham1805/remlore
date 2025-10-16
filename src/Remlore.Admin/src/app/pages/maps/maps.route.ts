import { Routes } from "@angular/router";

import { BubbleMapComponent } from "./bubble/bubble-map.component";
import { GmapsComponent } from "./gmaps/gmaps.component";
import { LeafletComponent } from "./leaflet/leaflet.component";
import { SearchMapComponent } from "./search-map/search-map.component";

export const mapRoutes: Routes = [
  {
    path: "gmaps",
    component: GmapsComponent,
  },
  {
    path: "leaflet",
    component: LeafletComponent,
  },
  {
    path: "bubble",
    component: BubbleMapComponent,
  },
  {
    path: "searchmap",
    component: SearchMapComponent,
  },
];
