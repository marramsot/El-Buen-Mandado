
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";

import {
  AccountContainer,
  AccountCard,
  AccountTitle,
  AccountDescription,
  AccountInfo,
  InfoGroup,
  InfoLabel,
  InfoValue,
  LogoutButton,
} from "./Account.styles.js";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AccountContainer>
      <AccountCard>
        <AccountTitle>Mi cuenta</AccountTitle>

        <AccountDescription>
          Consulta la información de tu cuenta en El Buen Mandado.
        </AccountDescription>

        <AccountInfo>
          <InfoGroup>
            <InfoLabel>Nombre completo</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Correo electrónico</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoGroup>
        </AccountInfo>

        <LogoutButton type="button" onClick={handleLogout}>
          Cerrar sesión
        </LogoutButton>
      </AccountCard>
    </AccountContainer>
  );
};

export default Account;
