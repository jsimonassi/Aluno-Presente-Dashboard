import styled from "styled-components";
import { TRANSITION_TIME } from "../../constants/menu";
import CONSTANTS from "../../constants";

export const MenuStyled = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    sidebarOpen: boolean;
    width: number;
}

const getPadding = (props: Props) => {    
	if(props.width < CONSTANTS.SCREEN_SIZE.TABLET) return 40;

	return props.sidebarOpen ? 310 : 100;
};

export const Content = styled.div<Props>`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 120px;
    padding-left: ${props => getPadding(props)}px;
    padding-right: 40px;
    min-width: 400px;

    transition: padding-left ${TRANSITION_TIME};
    transition-delay: ${props => props.sidebarOpen ? TRANSITION_TIME : 0};
`;