import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { NbThemeModule } from "@nebular/theme";
import { MATERIAL_DARK_THEME } from "./styles/material/theme.material-dark";
import { MATERIAL_LIGHT_THEME } from "./styles/material/theme.material-light";
import { CORPORATE_THEME } from "./styles/theme.corporate";
import { COSMIC_THEME } from "./styles/theme.cosmic";
import { DARK_THEME } from "./styles/theme.dark";
import { DEFAULT_THEME } from "./styles/theme.default";

export const provideTheme = (): EnvironmentProviders[] => [
  importProvidersFrom(
    NbThemeModule.forRoot(
      {
        name: "default",
      },
      [
        DEFAULT_THEME,
        COSMIC_THEME,
        CORPORATE_THEME,
        DARK_THEME,
        MATERIAL_LIGHT_THEME,
        MATERIAL_DARK_THEME,
      ]
    )
  ),
];
