import styled from "styled-components";
import { DEVICE } from "../../../../../../constants/screenSize";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CodeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.surface2};
    margin: 0 5px;
    width: 50px;
    border-radius: 8px;
    color: ${({ theme }) => theme.primary};

    h1 {
        font-size: 3rem;
    }

    @media ${DEVICE.TABLET} {
        width: 20px;
        h1 {
            font-size: 1.5rem;
        }
    }
`;