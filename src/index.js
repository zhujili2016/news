import React from "react";
import {render} from "react-dom";
import {Router,Route,IndexRoute,hashHistory} from "react-router";

import App from "./components/app";
import UserCenter from "./components/user_center";
import NewsContainer from "./components/news_container";
import NewsDatail from "./components/news_detail";

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NewsContainer}></IndexRoute>
            <Route path="/detail/:uniqueKey" component={NewsDatail}></Route>
            <Route path="/usercenter" component={UserCenter}></Route>
        </Route>

    </Router>
 ),document.getElementById("root"));
