import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./Layout.module.scss";

function Layout(): JSX.Element {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/about">Documentation</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
