import React from "react";
import s from "./Paginator.module.scss";

const Paginator = (props) => {
  let pagesCount = props.totalUsersCount / 30 / props.pageSize;

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((elem) => {
        return (
          <span
            className={props.currentPage === elem ? s.selected : ""}
            onClick={(e) => {
              props.onChangePage(elem);
            }}
          >
            {elem + " "}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
