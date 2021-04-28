import { ToastContainer, toast } from "react-toastify";

import { API_URL } from "@/config/index";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "@/styles/EventFullPage.module.css";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();

    const paths = events.map((evnt) => ({ params: { slug: evnt.slug } }));
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const evnt = await res.json();
    return {
        props: {
            evnt,
        },
        revalidate: 1,
    };
};
const EventFullPage = ({ evnt }) => {
    const router = useRouter();
    const oneEvent = evnt[0];
    console.log(oneEvent);
    const handleDelete = async () => {
        if (confirm("Are you sure ?")) {
            const res = await fetch(`${API_URL}/events/${oneEvent.id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                toast.error("something went wrong. Try again");
            } else {
                const evnt = await res.json();
                console.log(evnt);
                router.push(`/`);
            }
        }
    };
    return (
        <Layout>
            <main>
                <ToastContainer position="top-center" />
                <Link href={`/events/edit/${oneEvent.id}`}>
                    <button className="btn_back">Edit</button>
                </Link>
                <Link href="/">
                    <button onClick={handleDelete} className="btn_back">
                        Delete
                    </button>
                </Link>
                <div className={styles.imgBox}>
                    {!oneEvent.image && (
                        <img
                            src="/default.jpg"
                            alt="default logo"
                            width={960}
                            height={600}
                        />
                    )}
                    {oneEvent.image && (
                        <Image
                            src={oneEvent.image.formats.large.url}
                            alt={evnt.name}
                            width={960}
                            height={oneEvent.image.formats.large.height}
                        />
                    )}
                </div>
                <div className="info">
                    <h1>{oneEvent.name}</h1>
                    <h2>
                        Date:{" "}
                        {new Date(oneEvent.date).toLocaleDateString("en-UK")}{" "}
                        <span>Time : {oneEvent.time}</span>
                    </h2>
                    <h2>
                        venue : {oneEvent.venue}{" "}
                        <span>Address :{oneEvent.address}</span>
                    </h2>
                    <p>{oneEvent.description}</p>
                </div>
            </main>
        </Layout>
    );
};

export default EventFullPage;
