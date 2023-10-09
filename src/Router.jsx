import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

const Router = () => {
    const { loginState } = useAppContext();
    let routes;
    if (loginState) {

    } else {

    }

    return <BrowserRouter>{routes}</BrowserRouter>;
}

export default Router;