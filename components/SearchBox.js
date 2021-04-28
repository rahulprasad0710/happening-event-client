import React, { useState } from "react";

import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import navStyle from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

const SearchBox = (props) => {
    const [term, setTerm] = useState("");
    const router = useRouter();
    const handleChange = (e) => {
        setTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`);
        setTerm("");
    };

    return (
        <form onSubmit={handleSubmit} className={navStyle.navbar_searchbox}>
            <input
                value={term}
                type="text"
                onChange={handleChange}
                className={navStyle.navbar_input}
                placeholder="Search..."
            />
            <button
                className={navStyle.navbar_serach_btn}
                onSubmit={handleSubmit}>
                <IconContext.Provider
                    value={{
                        fontWeight: "800",
                        className: "navbar_search_btn_icon",
                    }}>
                    <div>
                        <BsSearch />
                    </div>
                </IconContext.Provider>
            </button>
        </form>
    );
};

export default SearchBox;
