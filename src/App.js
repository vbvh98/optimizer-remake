import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store/store";
import ColumnChoice from "./components/ColumnChoice";
import TableData from "./components/TableData";
import ProfileLength from "./components/ProfileLength";
import Result from "./components/Result";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={ColumnChoice} />
                    <Route path="/inputTable" component={TableData} />
                    <Route path="/profileLength" component={ProfileLength} />
                    <Route path="/result" component={Result} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
