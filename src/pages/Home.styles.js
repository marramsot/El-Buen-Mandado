
import styled from "styled-components";

export const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 12px;
  }
`;

export const Banner = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 40px 30px;
  margin-bottom: 30px;
  text-align: center;

  h1 {
    font-size: 36px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletSmall}) {
    padding: 25px 15px;

    h1 {
      font-size: 26px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

export const CategoryButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.white};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletLarge}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletSmall}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  padding: 30px;
  color: ${({ theme }) => theme.colors.textLight};
`;
