
import {css, CSSObject} from "styled-components";



export const mobile = (props : CSSObject) => {

    return css`
    @media only screen and (max-width: 627px){
        ${props}
    }
    `;
};


