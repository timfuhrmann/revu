import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        font-family: "Manrope", Helvetica, Arial, sans-serif;
        font-size: 1.6rem;
        background-color: ${p => p.theme.body};
        color: ${p => p.theme.color};
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;
