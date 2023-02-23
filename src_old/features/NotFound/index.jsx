import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>NotFoundPage</title>
        <meta name="description" content="A React application homepage" />
      </Helmet>
      <div className="not-found-page">NotFoundPage</div>
    </>
  );
}
