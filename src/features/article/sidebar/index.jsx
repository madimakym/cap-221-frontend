import React from "react";
import { NavLink } from "react-router-dom";
import { useFetchCateroriesQuery } from "../service/article-api";

export function Sidebar() {
  const cartegories = useFetchCateroriesQuery();

  return (
    <>
      <div className="menu">
        {cartegories.isSuccess && (
          <ul>
            {cartegories.data.map((item, index) => (
              <NavLink to={"/posts/" + item.id} key={index}>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
