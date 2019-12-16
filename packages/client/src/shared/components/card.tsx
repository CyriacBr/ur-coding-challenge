import React, { CSSProperties } from "react";
import styled from "styled-components";
import { Panel } from "rsuite";

const s = {
  Container: styled.div`
    box-shadow: 0 8px 20px 0 rgba(218, 224, 235, 0.6);
    background: rgb(251, 252, 253);
  `
};

interface CardProps {
  title: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, title, style }) => {
  return (
    <s.Container style={style}>
      <Panel header={title} bordered>
        {children}
      </Panel>
    </s.Container>
  );
};

export { Card };
