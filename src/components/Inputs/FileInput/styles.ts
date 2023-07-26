/* eslint-disable indent */
import styled from "styled-components";

interface ITagInputProps {
  isError?: boolean;
}

export const StackContainer = styled.div<ITagInputProps>`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  height: 55px;

  p {
    text-align: right;
    font-family: "Normal";
    padding-right: 10px;
    padding-top: 5px;
    font-size: 14px;
    box-sizing: border-box;
    color: ${(props) => props.theme.primary};
  }
    
  h3 {
      font-family: "Normal";
      padding-left: 10px;
      padding-top: 5px;
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.primary};
    }

  span {
    color: ${(props) => props.theme.primary};
    font-size: 12px;
    margin-left: 8px;
    margin-top: 5px;
    font-family: "Normal";
  }
`;

interface InfoBoxProps {
  visible: boolean;
}

export const InfoBoxContainer = styled.div<InfoBoxProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  /* display: flex; */
  position: absolute;
  margin-top: 130px;
`;

export const TitleContainer = styled.div<ITagInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 10px;

  h1 {
    font-size: 18px;
    font-weight: 500;
    margin-right: 5px;
    color: ${(props) => props.theme.primary};
    text-align: center;
  }
`;

export const InputStyled = styled.input`
  display: none;
`;

export const InputContainer = styled.div<ITagInputProps>`
  display: flex;
  flex-direction: row;
  height: 55px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border: ${(props) =>
    props.isError ? `2px solid ${props.theme.primary}` : "none"};

  &:hover {
    cursor: pointer;
  }
`;

export const FilenameText = styled.h5<ITagInputProps>`
  font-size: 18px;
  text-align: center;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  color: ${(props) => props.theme.primary};
  padding: 10px;
  font-family: "Normal";
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
`;
