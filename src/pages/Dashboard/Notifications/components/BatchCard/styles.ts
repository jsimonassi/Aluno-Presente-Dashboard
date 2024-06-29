

import styled from "styled-components";
import { DEVICE } from "../../../../../constants/screenSize";

export const CardBackground = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 16px;
    background-color: ${props => props?.isNew ? props.theme.surface3 : props.theme.surface2};
    max-height: ${props => props.isOpen ? "1000px" : "75px"};
    transition: all 0.6s ease;
`;

export const MainInfosContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const BatchInfos = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    color: ${props => props.theme.primary};

    h3 {
        font-family: "Bold"; 
        line-height: 28px;
    }

    p {
        line-height: 28px;
        margin-left: 8px;
        font-family: "Light";
    }

    h5 {
        background-color: ${props => props.theme.primary};
        border-radius: 4px;
        color: ${props => props.theme.surface1};
        padding: 4px;
        box-sizing: border-box;
        margin-left: 8px;
    }

    @media ${DEVICE.MOBILE} {
        font-size: 14px;

        h5 {
            display: none;
        }
    }
`;

export const StatusInfos = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    line-height: 24px;
    text-align: center;

    b {
        font-family: "Normal";   
        margin-right: 6px;
    }

    p {
        font-family: "Light";
    }

    @media ${DEVICE.DESKTOP} {
        font-size: 14px;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;

export const StudentsInfoContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: ${props => props.isOpen ? "100%" : "0"};
    opacity: ${props => (props.isOpen ? "1" : "0")};
    overflow-y: scroll;
    transition: all 0.6s ease;
    align-items: center;

    hr {
        width: 90%;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    small {
        color: ${props => props.theme.primary};
        margin-top: 8px;
        width: 88%;
        text-align: left;
    }
`;

export const StudentsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 8px;

    h4 {
        font-family: "Bold";
        color: ${props => props.theme.primary};
        font-size: 14px;
    }
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 8px;
    padding: 8px;
    box-sizing: border-box;
    background-color: ${props => props.theme.surface1};
    border-radius: 16px;
`;

export const StudentName = styled.p<StudentNameProps>`
    font-family: "Normal";
    font-size: 14px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: ${props => props.changeBackground ? props.theme.surface2 : props.theme.surface1};
    color: ${props => props.theme.primary};
    text-align: ${props => props.isEmptyList ? "center" : "left"};

    &:hover {
        opacity: 0.7;
    }
`;

interface ContainerProps {
    isOpen?: boolean;
    isNew?: boolean;
}

interface StudentNameProps {
    changeBackground: boolean;
    isEmptyList?: boolean;
}
