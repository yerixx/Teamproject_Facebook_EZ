import { createGlobalStyle ,css } from "styled-components";
import font from "../font/NotoSansKR-VariableFont_wght.ttf"

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Noto Sans KR';
  src: url(${font});
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul,li{
    list-style: none;
}
a{
    color: inherit;
    text-decoration: none;
}
input{
  font-family: 'Noto Sans KR', sans-serif;
}
body{
    font-family: 'Noto Sans KR', sans-serif;
    letter-spacing:-1px;
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
`;
// Font
// Main-header 01
export const MainHeader_48_b = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 48px;
`;
// Main-header 02
export const MainHeader_32_n = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 32px;
`;
// Main-title 01
export const MainTitle_26_b = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 26px;
`;
// Main-title 02
export const MainTitle_24_m = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500; /* Medium */
  font-size: 24px;
`;
// Main-title 03
export const MainTitle_22_b = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 22px;
`;
// Main-title 04
export const MainTitle_18_b = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;
// Main-description
export const MainDescription_36_n = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 36px;
`;
// Sub-title
export const SubTitle_16_b = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: 16px;
`;
// Sub-description 01
export const SubDescription_16_n = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 16px;
`;
// Sub-description 02
export const SubDescription_22_n = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 22px;
`;
// Sub-description 02
export const SubDescription_12_m = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500; /* Medium */
  font-size: 12px;
`;
// Paragraph
export const Paragraph_20_n = css`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: normal;
  font-size: 20px;
`;

export default GlobalStyles;