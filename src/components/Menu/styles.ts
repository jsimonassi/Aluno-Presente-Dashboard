import styled from "styled-components";
import { TRANSITION_TIME } from "../../constants/menu";

export const MenuStyled = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    sidebarOpen: boolean;
    isMainPage: boolean;
}

const getPadding = (props: Props) => {
	if (!props.isMainPage) {
		return 0;
	}
	return  props.sidebarOpen ? 310 : 100;
};

const getRightPadding = (props: Props) => {
	if (!props.isMainPage) {
		return 0;
	}
	return  40;
};

export const Content = styled.div<Props>`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 130px;
    padding-left: ${props => getPadding(props)}px;
    padding-right: ${props => getRightPadding(props)}px;
    min-width: 400px;

    transition: padding-left ${TRANSITION_TIME};
    transition-delay: ${props => props.sidebarOpen ? TRANSITION_TIME : 0};
`;