import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.primary};
`;

export const Item = styled.h3<ItemProps>`
    font-size: 18px;
    font-family: "bold";
    margin: 0;
    background-color: ${props => props.selected ? props.theme.primary : props.theme.whiteText};
    border: 2px solid ${props => props.theme.primary};
    width: 25px;
    height: 25px;
    border-radius: 6px;
    text-align: center;
    line-height: 28px;
    margin-right: 3px;
    color: ${props => props.selected ? props.theme.whiteText : props.theme.primary};

    &:hover {
        cursor: pointer;
    }
`;

interface ItemProps {
    selected?: boolean;
}