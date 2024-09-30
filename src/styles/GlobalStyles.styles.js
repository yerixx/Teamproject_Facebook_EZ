import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

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

body{
    font-family: 'Noto Sans KR', sans-serif;
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

   /* Border Radius */
    --border-radius-00: 0px;
    --border-radius-08: 8px;
    --border-radius-30: 30px;

   /* Line Weight */
    --line-weight-01: 1px;
    --line-weight-03: 3px;
    --line-weight-05: 5px;
    
    /* box-shadow */
    --box-shadow-01: 3px 5px 10px 0px rgba(15, 22, 30, 0.07);
    --box-shadow-02:  3px 8px 10px 0px rgba(15, 22, 30, 0.11);
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

// Font
// Main-header 01
export const MainHeader01Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 48px;
`;

// Main-header 02
export const MainHeader02Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: normal;
  font-size: 32px;
`;

// Main-title 01
export const MainTitle01Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 26px;
`;

// Main-title 02
export const MainTitle02Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500; /* Medium */
  font-size: 24px;
`;

// Main-title 03
export const MainTitle03Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 22px;
`;

// Main-title 04
export const MainTitle04Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

// Main-description
export const MainDescriptionStyle = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: normal;
  font-size: 36px;
`;

// Sub-title
export const SubTitleStyle = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

// Sub-description 01
export const SubDescription01Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: normal;
  font-size: 16px;
`;

// Sub-description 02 (22px)
export const SubDescription02Style = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: normal;
  font-size: 22px;
`;

// Sub-description 02 (12px, Medium)
export const SubDescription02SmallStyle = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500; /* Medium */
  font-size: 12px;
`;

// Paragraph
export const ParagraphStyle = css`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: normal;
  font-size: 20px;
`;

export default GlobalStyles;
