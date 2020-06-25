import React from "react";
import Header from "./Header";
import * as axios from "axios";
import { setAuthUserData } from "../../redux/authReducer";
import { connect } from "react-redux";
import { authMe } from "../../api/api";

class HeaderContainer extends React.Component {
  componentDidMount() {
    authMe().then((response) => {
        //let {id,email,login} = response.data.data;
        if (response.resultCode === 0) {
          this.props.setAuthUserData(response.data.id,response.data.email, response.data.login)
        }
        console.log(response);
      });
  }

  render() {
    return <Header {...this.props}/>;
  }
}


let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer)
