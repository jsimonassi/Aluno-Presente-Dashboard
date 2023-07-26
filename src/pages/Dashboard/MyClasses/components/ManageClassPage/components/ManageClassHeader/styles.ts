import styled from "styled-components";
import { AppTheme } from "../../../../../../../types/Theme";
import { DEVICE } from "../../../../../../../constants/screenSize";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.surface1};
    border-radius: 32px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;

    h1 {
        font-size: 28px;
        color: ${props => props.theme.primary};
        margin-left: 16px;
        font-family: "bold";
    }

    > div {
        display: flex;
        justify-content: start;
        align-items: center;
        
        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    @media ${DEVICE.MOBILE} {
        h1 {
            font-size: 18px;
        }
    }
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;

    h1 {
        font-size: 28px;
        color: ${props => props.theme.primary};
        margin-left: 16px;
        font-family: "bold";
    }

    > div {
        display: flex;
        justify-content: start;
        align-items: center;
        
        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    @media ${DEVICE.TABLET} {
        flex-direction: column;
    }

    @media ${DEVICE.MOBILE} {
        flex-direction: column;
        h1 {
            font-size: 18px;
        }
    }
`;

interface IButtonProps {
    selected: boolean;
    theme: AppTheme;
}

export const MenuButton = styled.p<IButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    margin-top: 16px;
    padding: 8px 16px;
    border-radius: 16px;
    height: 30px;
    font-size: 18px;
    background-color: ${(props: IButtonProps) => props.selected ? props.theme.surface2 : "transparent"};
    color: ${(props: IButtonProps) => props.theme.primary};

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;