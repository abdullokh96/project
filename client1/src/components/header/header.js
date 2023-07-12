import React from "react";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/auth-action";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userData");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <div className={styles.logo}>Logo</div>
          </Link>
          <div className={styles.buttons}>
            {user.fullName ? (
              <>
                <Link to="/posts">
                <Button variant="contained">
                  Создать
                </Button>
                </Link>
                <Button onClick={logout} color="error" variant="contained">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/sign-in">
                  <Button variant="contained">Войти</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
