import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { authConfig } from "@remlore/auth.config";
import { OAuthErrorEvent, OAuthService } from "angular-oauth2-oidc";
import { BehaviorSubject, Observable, filter, map } from "rxjs";
import { UserProfile } from "../type/user.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Observable streams for reactive UI
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private userProfileSubject$ = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$ = this.userProfileSubject$.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {
    // Configure OAuth service
    this.oauthService.configure(authConfig);
    console.log("OAuthService configured with:", authConfig);

    // Setup automatic silent token refresh
    this.oauthService.setupAutomaticSilentRefresh();

    // Subscribe to all OAuth events for debugging and state management
    this.oauthService.events.subscribe((event) => {
      // Log errors
      if (event instanceof OAuthErrorEvent) {
        console.error("OAuthErrorEvent:", event);
      } else {
        console.log("OAuth Event:", event.type);
      }

      // Handle specific events
      this.handleOAuthEvents(event);
    });

    // Update authentication status when tokens change
    this.oauthService.events
      .pipe(
        filter((e) =>
          [
            "token_received",
            "token_refreshed",
            "token_expires",
            "token_error",
          ].includes(e.type)
        )
      )
      .subscribe(() => {
        const isAuthenticated = this.oauthService.hasValidAccessToken();
        this.isAuthenticatedSubject$.next(isAuthenticated);

        if (isAuthenticated) {
          this.updateUserProfile();
        } else {
          this.userProfileSubject$.next(null);
        }
      });

    // Handle session termination
    this.oauthService.events
      .pipe(filter((e) => e.type === "session_terminated"))
      .subscribe(() => {
        console.log("Session terminated by IDS");
        this.handleSessionTerminated();
      });

    // Handle session errors
    this.oauthService.events
      .pipe(filter((e) => e.type === "session_error"))
      .subscribe(() => {
        console.error("Session error detected");
        this.handleSessionError();
      });
  }

  /**
   * Initialize authentication
   * Call this in APP_INITIALIZER or in your app component
   */
  async initAuth(): Promise<boolean> {
    console.log("Initializing authentication...");

    try {
      // 1. Load OpenID Connect discovery document
      // This fetches /.well-known/openid-configuration from your IDS
      await this.oauthService.loadDiscoveryDocument();
      console.log("Discovery document loaded");

      // 2. Try to login using code flow (if we're on callback URL)
      const loginResult = await this.oauthService
        .tryLoginCodeFlow()
        .then(() => {
          return this.oauthService.hasValidAccessToken();
        });

      if (loginResult) {
        console.log("Login from callback successful");
        this.isAuthenticatedSubject$.next(true);
        this.updateUserProfile();
        this.isDoneLoadingSubject$.next(true);

        // Navigate away from callback URL
        const state = this.oauthService.state;
        if (state) {
          this.router.navigateByUrl(decodeURIComponent(state));
        } else {
          this.router.navigate(["/"]);
        }
        return true;
      }

      // 3. Try to login silently using existing refresh token
      if (this.oauthService.hasValidAccessToken()) {
        console.log("Valid access token found");
        this.isAuthenticatedSubject$.next(true);
        this.updateUserProfile();
        this.isDoneLoadingSubject$.next(true);
        return true;
      }

      // 4. Try to refresh using refresh token
      if (this.oauthService.getRefreshToken()) {
        console.log("Attempting to refresh token...");
        try {
          await this.oauthService.refreshToken();
          this.isAuthenticatedSubject$.next(true);
          this.updateUserProfile();
          this.isDoneLoadingSubject$.next(true);
          return true;
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }

      // 5. No valid authentication found
      console.log("No valid authentication found");
      this.isAuthenticatedSubject$.next(false);
      this.isDoneLoadingSubject$.next(true);
      return false;
    } catch (error) {
      console.error("Error during authentication initialization:", error);
      this.isAuthenticatedSubject$.next(false);
      this.isDoneLoadingSubject$.next(true);
      return false;
    }
  }

  /**
   * Redirect user to Identity Server login page
   * @param targetUrl - URL to redirect to after successful login
   */
  login(targetUrl?: string): void {
    // Store the target URL in state so we can redirect after login
    const state = targetUrl || this.router.url;
    console.log("Redirecting to login...", targetUrl, this.router.url);

    // This will redirect to: https://localhost:5001/connect/authorize
    // with all necessary OAuth parameters (client_id, scope, code_challenge, etc.)
    this.oauthService.initCodeFlow(state);
  }

  /**
   * Logout user from both app and Identity Server
   */
  logout(): void {
    console.log("Logging out...");

    // This will:
    // 1. Clear local tokens
    // 2. Redirect to IDS logout endpoint
    // 3. IDS will redirect back to postLogoutRedirectUri
    this.oauthService.revokeTokenAndLogout();

    // Update state
    this.isAuthenticatedSubject$.next(false);
    this.userProfileSubject$.next(null);
  }

  /**
   * Manually refresh the access token using refresh token
   */
  async refreshToken(): Promise<void> {
    console.log("Manually refreshing token...");

    try {
      const result = await this.oauthService.refreshToken();
      console.log("Token refreshed successfully", result);
      this.updateUserProfile();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }

  /**
   * Check if user has a valid access token
   */
  hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  /**
   * Check if user has a valid ID token
   */
  hasValidIdToken(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  /**
   * Get the raw access token (JWT)
   */
  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  /**
   * Get the refresh token
   */
  getRefreshToken(): string {
    return this.oauthService.getRefreshToken();
  }

  /**
   * Get the ID token (JWT)
   */
  getIdToken(): string {
    return this.oauthService.getIdToken();
  }

  /**
   * Get decoded claims from ID token
   */
  getIdentityClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  /**
   * Get user profile from ID token claims
   * Maps to your custom claims from OpenIddict
   */
  getUserProfile(): UserProfile | null {
    const claims = this.getIdentityClaims();

    if (!claims) {
      return null;
    }

    // Map claims to user profile
    // These match the claims you set in AuthorizationController.cs
    const profile: UserProfile = {
      sub: claims.sub,
      email: claims.email,
      displayName: claims.DisplayName, // Your custom claim
      avatar: claims.avatar, // Your custom claim
      roles: Array.isArray(claims.role)
        ? claims.role
        : [claims.role].filter(Boolean),
    };

    return profile;
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    const profile = this.getUserProfile();
    return profile?.roles?.includes(role) ?? false;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    const profile = this.getUserProfile();
    return roles.some((role) => profile?.roles?.includes(role));
  }

  /**
   * Check if user has all of the specified roles
   */
  hasAllRoles(roles: string[]): boolean {
    const profile = this.getUserProfile();
    return roles.every((role) => profile?.roles?.includes(role));
  }

  /**
   * Get time until access token expires (in seconds)
   */
  getAccessTokenExpiration(): number {
    return this.oauthService.getAccessTokenExpiration();
  }

  /**
   * Get time until ID token expires (in seconds)
   */
  getIdTokenExpiration(): number {
    return this.oauthService.getIdTokenExpiration();
  }

  /**
   * Check if access token is expired or will expire soon
   * @param offsetSeconds - Check if token expires within this many seconds
   */
  isAccessTokenExpired(offsetSeconds: number = 0): boolean {
    const expiration = this.getAccessTokenExpiration();
    const now = Date.now();
    return expiration <= now + offsetSeconds * 1000;
  }

  /**
   * Load and return user info from the UserInfo endpoint
   * This makes an additional API call to /connect/userinfo
   */
  async loadUserProfile(): Promise<any> {
    try {
      const userInfo = await this.oauthService.loadUserProfile();
      console.log("User info loaded:", userInfo);
      return userInfo;
    } catch (error) {
      console.error("Failed to load user profile:", error);
      throw error;
    }
  }

  // ============================================
  // Private Helper Methods
  // ============================================

  private handleOAuthEvents(event: any): void {
    switch (event.type) {
      case "token_received":
        console.log("✅ Token received");
        break;

      case "token_refreshed":
        console.log("🔄 Token refreshed");
        break;

      case "token_expires":
        console.warn("⚠️ Token expires soon");
        break;

      case "token_error":
        console.error("❌ Token error");
        break;

      case "discovery_document_loaded":
        console.log("📄 Discovery document loaded");
        break;

      case "user_profile_loaded":
        console.log("👤 User profile loaded");
        break;

      case "session_terminated":
        console.log("🚪 Session terminated");
        break;

      case "session_error":
        console.error("❌ Session error");
        break;

      case "silently_refreshed":
        console.log("🔄 Silently refreshed");
        break;

      case "silent_refresh_timeout":
        console.warn("⏱️ Silent refresh timeout");
        break;

      case "code_error":
        console.error("❌ Code error");
        break;
    }
  }

  private updateUserProfile(): void {
    const profile = this.getUserProfile();
    this.userProfileSubject$.next(profile);
    console.log("User profile updated:", profile);
  }

  private handleSessionTerminated(): void {
    // Session was terminated by IDS, redirect to login
    this.isAuthenticatedSubject$.next(false);
    this.userProfileSubject$.next(null);
    this.login();
  }

  private handleSessionError(): void {
    // Session error occurred, try to refresh or redirect to login
    if (this.oauthService.getRefreshToken()) {
      this.refreshToken().catch(() => {
        this.login();
      });
    } else {
      this.login();
    }
  }

  /**
   * Run a function only if authenticated, otherwise redirect to login
   */
  runAuthenticated<T>(fn: () => T, loginRedirectUrl?: string): T | void {
    if (this.hasValidToken()) {
      return fn();
    } else {
      this.login(loginRedirectUrl);
    }
  }

  /**
   * Get an observable that emits only when authenticated
   */
  whenAuthenticated$<T>(source$: Observable<T>): Observable<T> {
    return this.isAuthenticated$.pipe(
      filter((isAuth) => isAuth),
      map(() => source$)
    ) as Observable<T>;
  }
}
