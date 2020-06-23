import React from "react";
import s from "./Users.module.scss";
import * as axios from "axios";
import userPhoto from "../../assets/images/profile.png";

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setUsersTotalCount(response.data.totalCount);
      });
  }

  onChangePage = (page) => {
    this.props.setCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    let pagesCount = (this.props.totalUsersCount/50) / this.props.pageSize;

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <div>
          {pages.map((elem) => {
            return (
              <span
                className={this.props.currentPage === elem ? s.selected : ""}
                onClick={(e) => { this.onChangePage(elem)}}
              >
                {elem + ' '}
              </span>
            );
          })}
        </div>
        {this.props.users.map((u) => (
          <div className={s.users}>
            <div className={s.user}>
              <div className={s.avaBlock}>
                <img
                  src={u.photos.large != null ? u.photos.large : userPhoto}
                />
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className={s.infoBlock}>
                <div className={s.infoMain}>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
                </div>
                <div>
                  <div>{"u.location.city"}</div>
                  <div>{"u.location.country"}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
