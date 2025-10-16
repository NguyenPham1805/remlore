import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig, provideAppInitializer } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from "@angular/router";
import { provideOAuthClient } from "angular-oauth2-oidc";
import { appRoutes } from "./app.route";
import { initializeAuth } from "./auth.config";
import { providerCore } from "./core/core.providers";
import { provideTheme } from "./theme/theme.poviders";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    providerCore(),
    provideTheme(),
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ["https://remlore.identity.local/"],
      },
    }),
    provideAppInitializer(initializeAuth),
    provideAnimationsAsync(),
  ],
};
