import { inject } from "@angular/core";
import { AuthConfig } from "angular-oauth2-oidc";
import { AuthService } from "./core/utils/auth.service";

export const authConfig: AuthConfig = {
  // Your Identity Server URL
  issuer: "https://remlore.identity.local/",

  // Where IDS redirects after login
  redirectUri: window.location.origin + "/auth/callback",

  // Where IDS redirects after logout
  postLogoutRedirectUri: window.location.origin + "/",

  // Your client ID from WorkerService.cs
  clientId: "remlore_admin",

  // Request these scopes (must match what you registered in IDS)
  scope: "openid profile email ids_admin_api offline_access",

  // Use authorization code flow (most secure for SPAs with PKCE)
  responseType: "code",

  // Enable silent refresh (automatically renew tokens in background)
  useSilentRefresh: true,
  silentRefreshRedirectUri:
    window.location.origin + "/assets/silent-refresh.html",

  // Check session status with IDS
  sessionChecksEnabled: true,

  // Refresh tokens before they expire (75% of lifetime)
  timeoutFactor: 0.75,

  // Show detailed logs in console (disable in production)
  showDebugInformation: true,

  // Clear URL hash after login
  clearHashAfterLogin: true,

  // IMPORTANT: Set to false in development if not using HTTPS
  // Set to true in production
  requireHttps: false, // Change to true in production

  // Don't be too strict with discovery document validation
  strictDiscoveryDocumentValidation: false,

  // Skip issuer check if needed (for development)
  // skipIssuerCheck: true,

  // OIDC is enabled by default - this enables ID tokens
  oidc: true,
};

export function initializeAuth() {
  return inject(AuthService).initAuth();
}
