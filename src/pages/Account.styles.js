
import styled from "styled-components";

export const AccountContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  padding: 40px 20px;
`;

export const AccountCard = styled.section`
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

export const AccountTitle = styled.h1`
  margin-bottom: 12px;
  color: #278C45;
  font-size: 28px;
  text-align: center;
`;

export const AccountDescription = styled.p`
  margin-bottom: 28px;
  color: #666666;
  font-size: 14px;
  text-align: center;
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 28px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoLabel = styled.span`
  color: #666666;
  font-size: 13px;
  font-weight: 600;
`;

export const InfoValue = styled.p`
  color: #333333;
  font-size: 16px;
  overflow-wrap: anywhere;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 13px;
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
