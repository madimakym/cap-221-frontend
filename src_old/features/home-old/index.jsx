import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFetchReposQuery } from "./service/home-api";

export function HomePage() {
  const [username, setUsername] = useState("madimakym");
  const { data, isFetching, isSuccess } = useFetchReposQuery(
    username ?? skipToken
  );

  const handleSearch = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React application homepage" />
      </Helmet>
      <div className="home-page">
        <div className="form-wrapper">
          <h1>React Repositories on Github</h1>
          <p>
            Search on GitHub the most starred repositories that use JavaScript,
            and add <br /> the weekly download counts for each package from
            npmjs.org
          </p>
          <form>
            <input
              id="user-name"
              className="form-field"
              placeholder="Search"
              autocomplete="off"
              type="text"
              name="username"
              onChange={handleSearch}
            />
          </form>
          <div className="repos">
            {data && <h3>{data.length} repository results</h3>}
            {isFetching && "Loading"}
            {data &&
              isSuccess &&
              data.map((item, index) => (
                <div className="repos-item" key={index}>
                  <div className="repos-link">
                    <a
                      href={item.html_url}
                      alt={item.name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.html_url}
                    </a>
                  </div>
                  <div className="repos-name">{item.name}</div>
                  <div className="repos-desc">{item.description}</div>
                  <div className="repos-language">{item.language}</div>
                  <div className="detail">
                    <div className="repos-desc">{item.pushed_at}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
