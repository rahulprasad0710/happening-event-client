import { API_URL } from "../config/index";
import EventItem from "@/components/EventItem";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
export async function getStaticProps() {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();
    return {
        props: { events },
        revalidate: 1,
    };
}

function Home({ events }) {
    console.log(events);
    return (
        <Layout>
            <main className={styles.main}>
                {!events && <h3>Loading...</h3>}
                <div className={styles.allevents}>
                    {events && events.map((evnt) => <EventItem evnt={evnt} />)}
                </div>
            </main>
        </Layout>
    );
}

export default Home;
