import { css } from "@emotion/react";
const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
  @font-face {
    font-family: 'SUIT';
    font-style: bold;
    font-weight: 700;
    src: url('assets/fonts/SUIT-Bold.woff2') format('woff2'),
      url('assets/fonts/SUIT-Bold.ttf') format('ttf'),
      url('assets/fonts/SUIT-Bold.otf') format('otf');
  }

  @font-face {
    font-family: 'SUIT';
    font-style: medium;
    font-weight: 600;
    src: url('assets/fonts/SUIT-Medium.woff2') format('woff2'),
      url('assets/fonts/SUIT-Medium.ttf') format('ttf'),
      url('assets/fonts/SUIT-Medium.otf') format('otf');
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: "SUIT", sans-serif;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export default reset;
