
import styled from "styled-components";

export const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  padding: 40px 20px;
`;

export const LoginCard = styled.section`
  width: 100%;
  max-width: 440px;
  padding: 36px;
  background-color: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
  box-shadow: 0 4px 16px #00000012;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const LoginTitle = styled.h1`
  margin-bottom: 10px;
  color: #278C45;
  font-size: 28px;
  text-align: center;
`;

export const LoginDescription = styled.p`
  margin-bottom: 28px;
  color: #666666;
  font-size: 14px;
  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  color: #333333;
  font-size: 14px;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #949494;
  border-radius: 6px;
  font-size: 15px;

  &:focus {
    outline: 2px solid #278C45;
    outline-offset: 1px;
  }
`;

export const LoginButton = styled.button`
  padding: 13px;
  margin-top: 8px;
  background-color: #278C45;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1E7037;
  }
`;

export const LoginFooter = styled.p`
  margin-top: 24px;
  color: #666666;
  font-size: 14px;
  text-align: center;

  a {
    color: #278C45;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #C62828;
  font-size: 13px;
  text-align: center;
`;
