
import styled from "styled-components";

export const Container = styled.main`
  max-width: 750px;
  margin: 40px auto;
  padding: 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 20px auto;
    padding: 0 12px;
  }
`;

export const ConfirmationCard = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

export const ConfirmationHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const SuccessIcon = styled.div`
  width: 65px;
  height: 65px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
`;

export const OrderSection = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 20px;
  margin-top: 20px;

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  p {
    margin: 8px 0;
    overflow-wrap: anywhere;
  }
`;

export const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 12px;

  span:last-child {
    text-align: right;
  }
`;

export const OrderTotal = styled(OrderRow)`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 15px;
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BackButton = styled.div`
  margin-top: 30px;
  text-align: center;

  a {
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 14px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;
