import React, { useState } from "react";
import s from "./Paginator.module.scss";

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionPageNumber = portionNumber * props.portionSize;
 
  return (
    <div>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (elem) =>
            elem >= leftPortionPageNumber && elem <= rightPortionPageNumber
        )
        .map((elem) => {
          return (
            <span
              className={props.currentPage === elem ? s.selected : ""}
              onClick={(e) => {
                props.onChangePage(elem);
              }}
              key={elem}
            >
              {elem + " "}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
