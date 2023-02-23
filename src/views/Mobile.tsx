import React from "react";
import { Link } from "react-router-dom";

import styles from "./Mobile.module.scss";

function Mobile(): JSX.Element {
    return (
        <>
            <nav className="navbar sticky-top navbar-dark bg-primary">
                <Link className={`${styles["title-link"]} navbar-brand bold`} to="/">
                    2D Frame
                </Link>
            </nav>
            <br />
            <h3>This app cannot use this app on mobile browsers</h3>
        </>
    );
}

export default Mobile;
