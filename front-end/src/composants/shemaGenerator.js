import React from 'react';
import styled from 'styled-components';
import Schema1 from './Schemas/schema1';
import Schema2 from './Schemas/schema2';
import Schema3 from './Schemas/schema3';
import Schema4 from './Schemas/schema4';
import Schema5 from './Schemas/schema5';

import '../styles/shemaGenerator.css';

const Overlay = styled.div.attrs({ className: 'overlay' })``;
const PopupContainer = styled.div.attrs({ className: 'popup-container' })``;
const CloseIcon = styled.span.attrs({ className: 'close-icon' })``;

const Popup = ({ onClose, trous, ranges, selectedSchema  }) => {
  let selectedComponent;

  switch (selectedSchema) {
    case "17ms - 25 ms - 42 ms":
      selectedComponent = <Schema1 trous={trous} ranges={ranges} />;
      break;
    case "17ms - 25ms - 42ms - 65ms":
      selectedComponent = <Schema2 trous={trous} ranges={ranges} />;
      break;
    case "42ms - 17ms":
      selectedComponent = <Schema3 trous={trous} ranges={ranges} />;
      break;
    case "100ms - 25ms - 17ms":
      selectedComponent = <Schema4 trous={trous} ranges={ranges} />;
      break;
    case "100ms - 17ms":
      selectedComponent = <Schema5 trous={trous} ranges={ranges} />;
      break;
    default:
      selectedComponent = <p>No schema selected</p>;
  }
  
  return (
    <>
      <Overlay />
      <PopupContainer>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        {selectedComponent}
      </PopupContainer>
    </>
  );
};

export default Popup;
