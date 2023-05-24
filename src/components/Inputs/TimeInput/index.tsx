/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import {InputContainer, StackContainer, TimeInputStyled, TitleContainer } from "./styles";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment";


interface MainInputProps {
    value: string | undefined;
    onChange: (value: string) => void;
	selectedDate?: string;
    errorText?: string;
    title?: string;
    style?: React.CSSProperties;
}

const TimeInput = (props: MainInputProps) => {


	const handleTimeChanged = (newTime: string) => {
		const hour = newTime.split(":")[0];
		const minute = newTime.split(":")[1];
		if(props?.selectedDate){
			const parsedDate = moment(props?.selectedDate).set({hour: parseInt(hour), minute: parseInt(minute)}).toISOString();
			props.onChange(parsedDate);
			return;
		}
		const parsedDate = moment().set({hour: parseInt(hour), minute: parseInt(minute)}).toISOString();
		props.onChange(parsedDate);
		return;
	};

	return (
		<StackContainer style={props.style} >
			{props.title &&
                <TitleContainer >
                	<h1>{props.title}</h1>
                </TitleContainer>
			}
			<InputContainer >
				<TimeInputStyled onChange={(newDate) => handleTimeChanged(newDate.target.value)}
					placeholder={""}
					value={props.value}
					type={"time"} 
					min={moment(props?.selectedDate).isBefore(moment()) ? moment().format("HH:mm") : ""}
				/>
			</InputContainer>
		</StackContainer>
	);
};

export default TimeInput;