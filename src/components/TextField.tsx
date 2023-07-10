import styled from "styled-components";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  //width: 100%;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  
`;

export default TextField;