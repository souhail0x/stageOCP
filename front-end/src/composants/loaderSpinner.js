import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for spinning
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Styled component for the loading spinner
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  ,
`;

// Wrapper component for centering the spinner
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  left:100px;
  height: 400px; /* Adjust height to 100% */
`;

// Loading component using the Spinner styled component
const Loading = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default Loading;
