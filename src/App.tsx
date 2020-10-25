import React from "react";
import "./App.scss";
import { Route, withRouter, Redirect, Switch, NavLink } from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import { UsersPage } from "./components/users/UsersPage";
import ProfileContainer from "./components/profile/ProfileContainer";
import Header from "./components/header/Header";
import { LoginPage } from "./components/login/LoginPage";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

// type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapPropsType = {
  initialized: boolean;
  isAuth: boolean;
};

type DispatchPropsType = {
  initializeApp: () => void;
};

/* type OwnPropsType = {
  friendsData: Array<FriendType>
}; */

class App extends React.Component<MapPropsType & DispatchPropsType> {
  state = {
    collapsed: false,
  };

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  onCollapse = (collapsed: any) => this.setState({ collapsed });

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    const { collapsed } = this.state;

    return (
      <>
        {this.props.isAuth ? (
          <Layout className="app" style={{ minHeight: "100vh" }}>
            <Header />

            <Content>
              <Layout style={{ minHeight: "100vh" }}>
                <Sider
                  collapsible
                  collapsed={collapsed}
                  onCollapse={this.onCollapse}
                >
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                  >
                    <SubMenu
                      key="sub1"
                      icon={<UserOutlined />}
                      title="My profile"
                    >
                      <Menu.Item key="1">
                        <NavLink to="/profile">Profile</NavLink>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <NavLink to="/dialogs">Messages</NavLink>
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                      key="3"
                      icon={<UsergroupAddOutlined />}
                      title="Users"
                    >
                      <NavLink to="/users">Users</NavLink>
                    </Menu.Item>
                    <SubMenu
                      key="sub3"
                      icon={<AppstoreOutlined />}
                      title="Other"
                    >
                      <Menu.Item key="5">News</Menu.Item>
                      <Menu.Item key="6">Music</Menu.Item>
                      <Menu.Item key="7">Settings</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
                <Content style={{ padding: "24px", minHeight: 280 }}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to="/profile" />}
                    />
                    <Route
                      path="/dialogs"
                      render={() => <DialogsContainer />}
                    />
                    <Route
                      path="/profile/:userId?"
                      render={() => <ProfileContainer />}
                    />
                    <Route path="/users" render={() => <UsersPage />} />
                    <Route path="/login" render={() => <LoginPage />} />
                    <Route path="*" render={() => <div>404 not found</div>} />
                  </Switch>
                  <Footer style={{ textAlign: "center" }}>
                    NetZ Design ©2020
                  </Footer>
                </Content>
              </Layout>
            </Content>
          </Layout>
        ) : (
          <Layout className="loginWrapper" style={{ minHeight: "100vh" }}>
            <LoginPage />
          </Layout>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
  };
};

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SocialApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SocialApp;

// window.store = store;
