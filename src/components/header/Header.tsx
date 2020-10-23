import React from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { Layout } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../../redux/auth-selectors";
import { logoutThunkCreator } from "../../redux/auth-reducer";
import {
  UserOutlined,
  LogoutOutlined,
  ExpandOutlined,
} from "@ant-design/icons";

export type MapStatePropsType = {};

const Header: React.FC<MapStatePropsType> = (props) => {
  const { Header } = Layout;

  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutThunkCreator());
  };

  return (
    <Header className={s.header}>
      <div className={s.logo}>
        <NavLink to="/profile">
          <ExpandOutlined />
          <span>SOCIUM.</span>
        </NavLink>
      </div>

      {isAuth ? (
        <div className={s.loginBlock}>
          <Avatar
            style={{ backgroundColor: "#9260ff" }}
            icon={<UserOutlined />}
          />

          <span className={s.login}>{login}</span>
          <NavLink to="/login">
            <LogoutOutlined onClick={logout} />
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </Header>
  );
};

export default Header;
