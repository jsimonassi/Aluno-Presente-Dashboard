import styled from "styled-components";

export const LocationBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const MapAddressInput = styled.input`
    box-sizing: border-box;
    border: 1px solid transparent;
    width: 80%;
    height: 50px;
    padding: 0 12px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    font-size: 14px;
    outline: none;
    text-overflow: ellipsis;
    position: absolute;
    left: 10%;
    margin-top: 16px;
`;

export const LocationCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
    background-color: ${props => props.theme.background};
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: ${props => props.theme.primary};

    h3 {
        font-size: 20px;
        margin-left: -16px;
        font-family: "bold";
    }

    span {
        margin-left: -16px;
    }

`;

export const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 24px;
`;

export const CloseIconContainer = styled.div`
    display: flex;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 150px;
    border-radius: 8px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    overflow: auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 8px;
    }
`;

export const OptionLabel = styled.h3`
	font-size: 16px;
	width: 100%;
	padding-left: 8px;
	box-sizing: border-box;
	font-family: "normal";
	color: ${props => props.theme.primary};
	margin-top: 16px;
`;