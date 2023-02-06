import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    /* font-size: 62.5%; */
    font-size: 75%;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Happiness-Sans-Title', 'Roboto';
  }
  body {
    max-width: 1920px;
    /* width: 1920px; */
    margin: 0 auto;
    overflow-x: hidden;
  }
  @font-face {
    font-family: 'Happiness-Sans-Title';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Title.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;
