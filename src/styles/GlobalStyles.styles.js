import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
ul,li{
    list-style: none;
}
a{
    color: inherit;
    text-decoration: none;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

export default GlobalStyles;
