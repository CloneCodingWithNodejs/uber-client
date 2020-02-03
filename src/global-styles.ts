import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const Globalstyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
${reset};
* {
    box-sizing: border-box;
}
body{
    font-family: 'Noto Sans KR', sans-serif;
}
a{ 
    color:inherit;
    text-decoration:none;
}
input,
button{
    &:focus,
    &:active{outline:none}
}

`;

export default Globalstyle;
