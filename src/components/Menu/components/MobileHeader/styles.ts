import styled from "styled-components";
import { TRANSITION_TIME } from "../../../../constants/menu";

interface ContainerProps {
    open: boolean;
}

export const StackContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5%;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 4%;
    max-height: ${props => props.open ? "300px" : "8%"};
    position: fixed;
    width: 100%;
    background-color: ${props => props.theme.surface1};
    z-index: 99;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75); //TODO: Adicionar sobra conforme scroll
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    box-sizing: border-box;

    -webkit-transition: max-height 0.7s ease;
    -moz-transition: max-height 0.7s ease;
    -ms-transition: max-height 0.7s ease;
    -o-transition: max-height 0.7s ease;
    transition: max-height 0.7s ease;
    transition-delay: ${props => props.open ? "0s" : "0.2s"};
`;


export const HeaderStyled = styled.header`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    > h1 {
        color: ${props => props.theme.primary};
        display: flex;
        font-size: 1.5rem;
        font-family: "bold";
        min-width: max-content;

        transition: padding-left ${TRANSITION_TIME};
        transition-delay: ${TRANSITION_TIME};
    }

    > div {
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;

export const OptionList = styled.div<ContainerProps>`
    display: flex;
    opacity: ${props => props.open ? 1 : 0};
    flex-direction: column;
    width: 100%;
    margin-top: 10px;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    transition: all .5s ease;
    transition-delay: ${props => props.open ? "0.2s" : "0s"};

    > p {
        color: ${props => props.theme.primary};
        font-size: 1.2rem;
        padding-top: 5px;

        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;