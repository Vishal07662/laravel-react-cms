// import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Toast from "./components/partials/Toast";
import routes from "./routes";

function App() {
  return (
    // <HelmetProvider>
      <Router>
        <Routes>
          {routes.map((r, idx) => {
            return <Route key={idx} path={r.path} element={r.element} />;
          })}
        </Routes>
        <Toast/>
      </Router>
    // </HelmetProvider>
  );
}

export default App;
