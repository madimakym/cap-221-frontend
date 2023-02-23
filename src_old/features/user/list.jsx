import { Helmet } from "react-helmet-async";
import "moment/locale/fr";
import "./styles/style.scss";
import { useFetchUserQuery } from "./service/user-api";

export function ListPage() {
  const users = useFetchUserQuery();
  return (
    <>
      <Helmet>
        <title>List </title>
        <meta name="description" content="CAP221" />
      </Helmet>

      <div className="container">
        {users.isSuccess &&
          users.data &&
          users.data.map((item) => (
            <div>
              <p>{item.firstname}</p>
              <p>{item.lastname}</p>
              <p>{item.email}</p>
              <p>{item.metier}</p>
              <p>{item.numero_cni}</p>
              <hr />
            </div>
          ))}
      </div>
    </>
  );
}
