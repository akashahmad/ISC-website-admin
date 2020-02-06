import React, { useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import 'bulma/css/bulma.css'
import './assets/Style/Common.scss'
import './assets/Style/Style.scss'
import 'bulma-helpers/css/bulma-helpers.min.css'
import AllRoutes from './Routes'
import Signin from './Components/Signin/signin'
import WrapRootElement from './Components/apollo/wrap-root-element'
import cookie from 'react-cookies'

const App = (props) => {

    let { history, location } = props;
    useEffect(() => {
        setTimeout(() => {
            let token = cookie.load("token");
            if (!token) {
                history.push("/signin");
            }
        }, 1000);
    }, [location.pathname])
    return (
        <WrapRootElement>
            <Switch>
                <Route path={"/signin"} exact component={Signin} />
                <Route path={"/"} component={AllRoutes} />
            </Switch>
        </WrapRootElement>
    );
}
export default withRouter(App);
