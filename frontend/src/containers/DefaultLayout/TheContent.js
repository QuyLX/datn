import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { connect } from 'react-redux'
// routes config
import routes from '../../routes'
import UiUser from '../../utils/UIuser'
import { useSelector } from 'react-redux'

const TheContent = () => {
  const { user } = useSelector((state) => state.auth);
  return user === null ? "" : user.data.role === "admin" ? (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<div>...Loading</div>}>
          <Switch>
            {routes.map((route, idx) => (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            ))}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  ) : user.data.role === "user" ? (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<div>...Loading</div>}>
          <Switch>
            {UiUser.map((route, idx) => (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            ))}
            <Redirect from="/" to="/rooms" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  ) : user.data.role === "moderator" ? (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<div>...Loading</div>}>
          <Switch>
            {routes.map((route, idx) => (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            ))}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  ) : ""
}

export default connect(null)(React.memo(TheContent))
