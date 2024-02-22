import { createGlobalStyle } from "styled-components";
import { AppTheme } from "../../types/Theme";

interface IBackgroundStyleProps {
  theme: AppTheme
}

const GlobalStyle = createGlobalStyle<IBackgroundStyleProps>`
  body {
    background-color: ${props => props.theme.background};
  }


    /* width */
    ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;

    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

`;

export default GlobalStyle;