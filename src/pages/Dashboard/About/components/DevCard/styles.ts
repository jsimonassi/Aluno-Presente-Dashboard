import styled from "styled-components";

export const CardBackground = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: ${props => props.theme.surface2};
    border-radius: 16px;
    padding: 8px 16px;
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 16px;
    height: 80px;

    > img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        color: ${props => props.theme.primary};

        h2 {
            font-size: 18px;
        }

        p {
            font-size: 14px;
            font-family: "Light";
        }
    }

    &:hover {
        background-color: ${props => props.theme.surface3};
        cursor: pointer;
    }
`;

