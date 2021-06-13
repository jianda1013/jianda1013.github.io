import React from "react"
import Headerbar from "./headbar/headbar"
import Footer from "./footer"
import Sidebar from "./sidebar/sidebar"

import "./components.css"

const Layout = ({ child }) => {
    return (
        <div className="layout">
            <Headerbar />
            <Sidebar />
            <div className="layout-body">
                <div>{child}</div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout