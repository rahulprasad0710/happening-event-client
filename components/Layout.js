import Footer from "./Footer";
import Head from "next/head";
import Navbar from "./Navbar";
import React from "react";

Layout.defaultProps = {
    title: "Happenings : Find the hottest happenings around You",
    description: "Find the latest events of all types.",
    keywords: "music ,concerts, dj, rally, function ",
};

export default function Layout({ title, description, keywords, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="descriptions" content={description} />
                <meta name="keywords" keywords={keywords} />
            </Head>
            <Navbar />
            <div className=" container layoutPage">{children}</div>
            <Footer />
        </div>
    );
}
