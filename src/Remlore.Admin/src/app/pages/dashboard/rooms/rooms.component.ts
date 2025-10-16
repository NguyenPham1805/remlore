import { Component, HostBinding, OnDestroy } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from "@nebular/theme";
import { map } from "rxjs/operators";
import { PlayerComponent } from "./player/player.component";
import { RoomSelectorComponent } from "./room-selector/room-selector.component";

@Component({
  selector: "rl-rooms",
  styleUrls: ["./rooms.component.scss"],
  templateUrl: "./rooms.component.html",
  imports: [RoomSelectorComponent, PlayerComponent, NbCardModule, NbIconModule],
})
export class RoomsComponent implements OnDestroy {
  @HostBinding("class.expanded")
  expanded = false;
  private selected!: string;

  isDarkTheme!: boolean;

  breakpoint!: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  themeChangeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService
      .onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

    this.themeChangeSubscription = this.themeService
      .onThemeChange()
      .pipe(map(({ name }) => name === "cosmic" || name === "dark"))
      .subscribe((isDark: boolean) => (this.isDarkTheme = isDark));
  }

  select(roomNumber: string) {
    if (this.isSelected(roomNumber)) {
      this.expand();
    } else {
      this.collapse();
    }

    this.selected = roomNumber;
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  isCollapsed() {
    return !this.expanded;
  }

  private isSelected(roomNumber: string): boolean {
    return this.selected === roomNumber;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.themeChangeSubscription.unsubscribe();
  }
}
