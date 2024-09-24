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
:root {
   /* Color */
   --color-facebookblue: #1877F2;
   --color-black: #050505;
   --color-gray-01: #64676B;
   --color-gray-02: #BBBBBB;
   --color-light-gray-01: #E6E6E6;
   --color-light-gray-02: #F4F4F4;
   --color-white: #FFFFFF;

   /* Font Size */
   --font-size-header-01: 48px;
   --font-size-header-02: 32px;
   --font-size-title-01: 26px;
   --font-size-title-02: 24px;
   --font-size-title-03: 22px;
   --font-size-title-04: 18px;
   --font-size-paragraph: 20px;
   --font-size-subtitle: 16px;
   --font-size-description-01: 16px;
   --font-size-description-02: 22px;

   /* Font Weight */
   --font-weight-bold: 700;
   --font-weight-medium: 500;
   --font-weight-regular: 400;

   /* Border Radius */
   --border-radius-00: 0px;
   --border-radius-08: 8px;
   --border-radius-30: 30px;

   /* Line Weight */
   --line-weight-01: 1px;
   --line-weight-03: 3px;
   --line-weight-05: 5px;
}
`;

export default GlobalStyles;
