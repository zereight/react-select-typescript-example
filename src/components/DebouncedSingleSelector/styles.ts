import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.div`
  font-size: 1rem;
`;

export const Label = styled.span<{
  isRequired: boolean;
}>`
  color: "#999999";
  margin-bottom: 0.6rem;
  font-size: 1rem;
  ${({ isRequired }) => {
    return (
      isRequired &&
      css`
        &::after {
          content: "*";
          display: inline-block;
          vertical-align: top;
          font-weight: 700;
          color: "#f44336";
          margin-left: 0.125rem;
          font-size: 1.25rem;
          line-height: 1.25rem;
        }
      `.styles
    );
  }}
`;
