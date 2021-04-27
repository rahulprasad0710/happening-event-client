import React, { useContext } from "react";

import Link from "next/link";
import navStyle from "../styles/Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={navStyle.nav}>
            <div className={navStyle.container}>
                <Link href="/">
                    <div>
                        <h1 className={navStyle.brandName}>
                            {" "}
                            <span>Happenings</span>
                        </h1>
                    </div>
                </Link>

                <div>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
