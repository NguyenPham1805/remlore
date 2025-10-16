import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbComponentSize,
  NbIconModule,
  NbMediaBreakpointsService,
  NbThemeService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { MatRipple } from "@angular/material/core";
import {
  Camera,
  SecurityCamerasData,
} from "@remlore/core/data/security-cameras";

@Component({
  selector: "rl-security-cameras",
  styleUrls: ["./security-cameras.component.scss"],
  templateUrl: "./security-cameras.component.html",
  imports: [
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    MatRipple,
  ],
})
export class SecurityCamerasComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  cameras: Camera[] = [];
  selectedCamera!: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = "medium";

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData
  ) {}

  ngOnInit() {
    this.securityCamerasService
      .getCamerasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cameras: Camera[]) => {
        this.cameras = cameras;
        this.selectedCamera = this.cameras[0];
      });

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? "medium" : "small";
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }
}
