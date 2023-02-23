import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Documentation from "./views/Documentation";
import RouteNotFound from "./views/RouteNotFound";
import Home from "./views/Home";
import Input from "./views/Input";
import Layout from "./components/Layout";
import Login from "./views/Login";

import "./App.scss";

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="input" element={<Input />} />
                <Route path="login" element={<Login />} />

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<RouteNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
