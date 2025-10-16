import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbLayoutModule, NbSpinnerModule } from "@nebular/theme";
import { AuthService } from "@remlore/core/utils/auth.service";

@Component({
  selector: "app-auth-callback",
  standalone: true,
  imports: [CommonModule, NbSpinnerModule, NbLayoutModule],
  template: `
    <nb-layout>
      <nb-layout-column>
        <div class="callback-container">
          <nb-spinner status="primary" size="giant"></nb-spinner>
          <h3>Processing login...</h3>
          <p>Please wait while we complete your authentication.</p>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 20px;
        text-align: center;
      }
    `,
  ],
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    console.log("CallbackComponent - Processing callback...");

    try {
      // The AuthService.initAuth() will handle the callback
      // and navigate to the appropriate page
      await this.authService.initAuth();

      // If we're still on the callback page after init, navigate home
      if (this.router.url.includes("/auth/callback")) {
        console.log("Still on callback page, redirecting to home");
        this.router.navigate(["/"]);
      }
    } catch (error) {
      console.error("Error processing authentication callback:", error);
      // Navigate to home or error page
      this.router.navigate(["/"], {
        queryParams: { error: "auth_failed" },
      });
    }
  }
}
