import { API_URL } from "@/config/index";
import React from "react";

export const getStaticProps = async () => {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
    const events = await res.json();
    return {
        props: {
            events,
        },
        revalidate: 1,
    };
};

const EventPage = ({ events }) => {
    console.log(events);
    return <div>Event page</div>;
};

export default EventPage;
