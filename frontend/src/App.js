import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/style.scss";
import PrivateRoute from "./containers/Router/PrivateRoute";
//redux
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { loaduser } from "./redux/actions/auth";
// Containers
const TheLayout = React.lazy(() =>
  import("./containers/DefaultLayout/TheLayout")
);
// Pages
const Login = React.lazy(() => import("./containers/LoginPage/LoginPage"));
const Register = React.lazy(() =>
  import("./containers/RegisterPage/RegisterPage")
);

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <React.Suspense fallback={<div>...Loading</div>}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <PrivateRoute path="/" name="Home">
              <TheLayout />
            </PrivateRoute>
          </Switch>
        </React.Suspense>
      </Provider>
    </Router>
  );
};

export default App;
