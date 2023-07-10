import styled from "styled-components";

const Button = styled.button`
  border-radius: 0 10px 10px 0;
  height: 100%;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 80%;
    border-radius: 10px 10px 10px 10px;
    border: 2px solid;
  }

  &:hover {
    .button {
      display: none;
    }
  }
`;

export default Button;
