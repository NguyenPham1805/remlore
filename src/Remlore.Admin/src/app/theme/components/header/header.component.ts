import { AsyncPipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { NbSecurityModule } from "@nebular/security";
import {
  NbActionsModule,
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSearchModule,
  NbSelectModule,
  NbSidebarService,
  NbThemeService,
  NbUserModule,
} from "@nebular/theme";

import { UserData } from "@remlore/core/data/users";
import { UserProfile } from "@remlore/core/type/user.type";
import { LayoutService } from "@remlore/core/utils";
import { AuthService } from "@remlore/core/utils/auth.service";

import { Observable, Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "rl-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
  imports: [
    NbUserModule,
    NbContextMenuModule,
    NbIconModule,
    NbSelectModule,
    NbActionsModule,
    NbSecurityModule,
    NbSearchModule,
    NbButtonModule,
    AsyncPipe,
    MatRipple,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = true;
  isAuthenticated$!: Observable<boolean>;
  user: UserProfile | null = null;
  isMaterialTheme = false;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
    {
      value: "material-light",
      name: "Material Light",
    },
    {
      value: "material-dark",
      name: "Material Dark",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private authService: AuthService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.userService
    //   .getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => (this.user = users.nick));

    this.user = this.authService.getUserProfile();

    this.isAuthenticated$ = this.authService.isAuthenticated$;

    console.log("identityClaims", this.authService.getIdentityClaims());

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        tap((theme) => {
          const themeName = theme?.name || "";
          this.isMaterialTheme = themeName.startsWith("material");
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
