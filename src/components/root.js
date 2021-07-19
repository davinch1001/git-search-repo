import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Form from "./form";
import Readme from "./readme";
import RepoList from "./repoList";


const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/md/:repoName' component={Readme}/>
                <Route exact path='/'  component={Form}/>
                <Route exact path='/user'  component={RepoList}/>
            </Switch>
        </BrowserRouter>

    );
};

export default Root;