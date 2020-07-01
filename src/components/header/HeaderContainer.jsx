import React from "react";
import Header from "./Header";
import { getAuthUserData, logoutThunkCreator } from "../../redux/authReducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData()
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    
  };
};

export default connect(mapStateToProps, { getAuthUserData, logoutThunkCreator })(HeaderContainer);
