import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 3.8rem;
  height: 1rem;

  div {
    position: absolute;
    top: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: currentColor;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 0;
    animation: lds-ellipsis1 0.6s infinite;
  }

  div:nth-child(2) {
    left: 0;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(3) {
    left: 1.4rem;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(4) {
    left: 2.8rem;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(1.4rem, 0);
    }
`;

export const Spinner: React.FC = () => {
    return (
        <SpinnerWrapper>
            <div />
            <div />
            <div />
            <div />
        </SpinnerWrapper>
    );
};
