import { Component } from "@angular/core";
import { NbButtonModule, NbCardModule, NbMenuService } from "@nebular/theme";

@Component({
  selector: "rl-not-found",
  styleUrls: ["./not-found.component.scss"],
  templateUrl: "./not-found.component.html",
  imports: [NbCardModule, NbButtonModule],
})
export class NotFoundComponent {
  constructor(private menuService: NbMenuService) {}

  goToHome() {
    this.menuService.navigateHome();
  }
}
