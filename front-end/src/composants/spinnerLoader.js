import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for the spinner
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components for the spinner and its container
const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey border */
  border-top: 4px solid #3498db; /* Blue border on top */
  border-radius: 50%; /* Make it round */
  width: 50px; /* Set width and height */
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite; /* Apply animation */
`;

// Spinner component
const Loader = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Loader;
