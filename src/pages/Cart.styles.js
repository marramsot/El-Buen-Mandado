
import styled from "styled-components";

export const Container = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;

  h1 {
    margin-bottom: 25px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 12px;
  }
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletSmall}) {
    grid-template-columns: 1fr;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CartItem = styled.article`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ItemImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const ItemInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    width: 32px;
    height: 32px;
    font-size: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: none;
  font-size: 14px;
  padding: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Summary = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;

  h2 {
    margin: 0 0 20px;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
`;

export const Total = styled(SummaryRow)`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 50px 20px;

  p {
    margin-bottom: 25px;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const BackLink = styled.div`
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
