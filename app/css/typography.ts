import styled from "styled-components";

export const H1 = styled.h1`
    font-size: 7.5rem;
    font-weight: 900;
    letter-spacing: -0.3rem;
    line-height: 1;

    @media ${p => p.theme.bp.l} {
        font-size: 15rem;
        letter-spacing: -0.75rem;
    }
`;

export const H2 = styled.h2`
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.1rem;
    line-height: 1.2;

    @media ${p => p.theme.bp.l} {
        font-size: 4.5rem;
    }
`;

export const H3 = styled.h3`
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.1rem;
    line-height: 1.2;

    @media ${p => p.theme.bp.l} {
        font-size: 3rem;
    }
`;

export const H4 = styled.h4`
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.05rem;
    line-height: 1.2;
`;

export const H5 = styled.h5`
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.025rem;
`;

export const FlowText = styled.div`
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.3;
    color: ${p => p.theme.gray600};

    @media ${p => p.theme.bp.l} {
        font-size: 1.7rem;
    }
`;

export const SmallText = styled.div`
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.3;
    color: ${p => p.theme.gray600};
`;

export const InputText = styled.div`
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1;
`;

export const AccentText = styled.div`
    font-size: 1.4rem;
    line-height: 1.4;
`;

export const ButtonText = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1;
`;

export const ChipText = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1;
`;

export const LandingButtonText = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1;
`;
