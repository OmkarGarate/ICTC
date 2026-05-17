import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
