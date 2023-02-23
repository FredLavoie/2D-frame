import React from "react";
import { Outlet, Link } from "react-router-dom";

import styles from "./Layout.module.scss";

function Layout(): JSX.Element {
    return (
        <>
            <nav className="navbar sticky-top navbar-dark bg-primary">
                <div className={styles["nav-links-container"]}>
                    <Link className={`${styles["title-link"]} navbar-brand bold`} to="/">
                        2D Frame
                    </Link>
                    <div className="navbar-brand">
                        <Link className="navbar-brand" to="/dashboard">
                            Dashboard
                        </Link>
                        <Link className="navbar-brand" to="/documentation">
                            Documentation
                        </Link>
                        <Link className="navbar-brand" to="/documentation">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
