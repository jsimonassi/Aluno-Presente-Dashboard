import styled from "styled-components";
import { TRANSITION_TIME } from "../../../../constants/menu";


export const Container = styled.div`
    flex-direction: row;
    display: flex;
    background-color: ${props => props.theme.background};
`;

interface SidebarProps {
    open: boolean;
    // theme: Theme,
}

export const SidebarStyled = styled.div<SidebarProps>`
    height: 97%;
    background-color: ${props => props.theme.surface1};
    padding-left: 20px;
    padding-right: 20px;
    padding-right: 10px;
    padding-top: 30px;
    align-items: center;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;

    width: 250px;
    margin-left: ${props => props.open ? 0 : -280}px;
    border-top-right-radius: ${props => props.open ? 20 : 0}px;
    border-bottom-right-radius: ${props => props.open ? 20 : 0}px;

    transition: margin-left ${TRANSITION_TIME}, border-radius ${TRANSITION_TIME};
    transition-delay: ${props => props.open ? TRANSITION_TIME : 0};

    z-index: 100;
  

    > img {
        max-width: 230px;
        max-height: 80px;
        object-fit: contain;
    }
`;

export const CloseSidebarButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: flex-end;
    margin-bottom: 40px;
    height: 100%;

    > div {
        display: flex;
        flex-direction: row; 
        align-items: center;
        width: 65%;
        justify-content: space-between;

        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }

    p {
        color: ${props => props.theme.secondaryColor};
        font-weight: 500;
    }

    img {
        width: 18px;
        margin-right: 10px;
    }

`;


export const ClosedSideBar = styled.div<SidebarProps>`
    height: 97%;
    background-color: ${props => props.theme.surface1};
    padding-top: 30px;
    align-items: center;
    flex-direction: column;
    width: ${props => props.open ? 0 : 70}px;
    display: flex;
    visibility: ${props => props.open ? "hidden" : "visible"};
    position: fixed;
    left: 0;
    top: 0;

    transition: width ${TRANSITION_TIME}, visibility ${TRANSITION_TIME};
    transition-delay: ${props => props.open ? 0 : TRANSITION_TIME};
    
    z-index: 100;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;

`;

export const SmallImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`;

interface ImageProps {
    open: boolean;
    radiusEnabled?: boolean;
}

export const SmallImage = styled.img<ImageProps>`
    width: ${props => props.open ? 0 : 40}px;
    transition: width ${TRANSITION_TIME};

    height: 40px;
    object-fit: cover;
    margin-bottom: 5px;
    border-radius: ${props => props?.radiusEnabled ? 10 : 0}px;


    &:hover {
        cursor: pointer;
    }
`;


export const OpenSidebarButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 40px;
    height: 100%;

    > div {
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }

    img {
        width: 18px;
    }
`;


export const LargeImgContainer = styled.img`
    margin-bottom: 40px;
    &:hover {
        cursor: pointer;
    }
`;
