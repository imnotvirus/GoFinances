import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type ThemeDefault = typeof theme;

  export interface DefaultTheme extends ThemeDefault {}
}
