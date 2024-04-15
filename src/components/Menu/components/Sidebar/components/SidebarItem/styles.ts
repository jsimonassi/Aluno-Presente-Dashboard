import styled from "styled-components";

interface ContainerProps {
    selected?: boolean;
    notificationsCount?: number;
}

export const SidebarItemStyled = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${props => props?.selected ? props.theme.primary : props.theme.surface2};

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;

        > span {
            font-size: 18px;
            font-weight: 400;
            margin-left: 10px;
        }

        p {
            font-size: 10px;
            font-family: "Light";
            color: ${props => props.theme.surface2};
            margin-left: 5px;
            background-color: ${props => props.theme.primary};
            border-radius: 4px;
            padding: 3px;
            color: ${props => props.theme.surface1};
        }
    }

    &:hover {
            cursor: pointer;
            opacity: 0.7;
    }
`;
