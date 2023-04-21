import { createGlobalStyle } from "styled-components";
import { AppTheme } from "../../types/Theme";

interface IBackgroundStyleProps {
  theme: AppTheme
}

const GlobalStyle = createGlobalStyle<IBackgroundStyleProps>`
  body {
    background-color: ${props => props.theme.background};
  }

`;

export default GlobalStyle;