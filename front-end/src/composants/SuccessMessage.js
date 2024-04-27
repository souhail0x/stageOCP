import React from "react";
import styled from "styled-components";

const StyledSuccessMessage = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const SuccessMessage = ({ children }) => {
  return <StyledSuccessMessage>{children}</StyledSuccessMessage>;
};

export default SuccessMessage;
