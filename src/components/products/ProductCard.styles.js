
import styled from "styled-components";

export const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px #0000001A;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 160px;
  }
`;

export const ProductName = styled.h3`
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

export const Presentation = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Price = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: auto 0 0;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
