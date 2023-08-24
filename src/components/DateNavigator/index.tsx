import React from "react";
import moment from "moment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Container, IconContainer } from "./styles";
import { useAppTheme } from "../../contexts/Theme";
import "moment/locale/pt-br";
import { MONTHS } from "../../constants/dates";


interface DateNavigatorProps {
    onNextMonth: () => void;
    onPreviousMonth: () => void;
    currentDate: moment.Moment;
}

const DateNavigator = (props: DateNavigatorProps) => {

	const { currentTheme } = useAppTheme();

	return (
		<Container>
			<IconContainer>
				<IoIosArrowBack onClick={props.onPreviousMonth} size={30} color={currentTheme.primary} />
			</IconContainer>
			<p>{MONTHS[props.currentDate.month()] + "/" + props.currentDate.year()}</p>
			<IconContainer>
				<IoIosArrowForward onClick={props.onNextMonth} size={30} color={currentTheme.primary} />
			</IconContainer>
		</Container>
	);
};

export default DateNavigator;