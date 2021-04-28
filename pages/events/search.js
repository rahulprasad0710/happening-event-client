import { Router, useRouter } from "next/router";

import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import qs from "qs";
import styles from "@/styles/Home.module.css";

export const getServerSideProps = async ({ query: { term } }) => {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { venue_contains: term },
                { description_contains: term },
                { address_contains: term },
            ],
        },
    });

    const res = await fetch(`${API_URL}/events?${query}`);
    const events = await res.json();
    return {
        props: {
            events,
        },
    };
};

const SearchPage = ({ events }) => {
    const router = useRouter();
    return (
        <Layout title="Search Results">
            <main className={styles.main}>
                <Link href="/">
                    <button className="btn_back">Go back</button>
                </Link>
                <h1>
                    Search Results for : <span>{router.query.term}</span>{" "}
                </h1>
                {events.length === 0 && (
                    <h3>No happenings related to this term</h3>
                )}
                <div className={styles.allevents}>
                    {events && events.map((evnt) => <EventItem evnt={evnt} />)}
                </div>
            </main>
        </Layout>
    );
};

export default SearchPage;
