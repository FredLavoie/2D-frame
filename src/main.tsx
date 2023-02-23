import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Mobile from "./views/Mobile";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="app-container">
                <App />
            </div>
            <div className="mobile-view">
                <Mobile />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
);
