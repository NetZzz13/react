import React from "react";
import Header from "./Header";
import * as axios from "axios";
import { setAuthUserData } from "../../redux/authReducer";
import { connect } from "react-redux";

class HeaderContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true
      })
      .then((response) => {
        //let {id,email,login} = response.data.data;
        if (response.data.resultCode === 0) {
          this.props.setAuthUserData(response.data.data.id,response.data.data.email, response.data.data.login)
        }
        console.log(response.data);
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
