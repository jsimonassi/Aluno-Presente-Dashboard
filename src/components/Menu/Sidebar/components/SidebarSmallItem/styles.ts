import styled from "styled-components";

interface ContainerProps {
    selected?: boolean;
}

export const SidebarSmallItemStyled = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px; 
    color: ${props => props?.selected? props.theme.primary : props.theme.surface2};

    &:hover {
            cursor: pointer;
            opacity: 0.7;
    }
`;
