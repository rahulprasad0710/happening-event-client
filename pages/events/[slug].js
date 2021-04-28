import { API_URL } from "@/config/index";
import Layout from "../../components/Layout";

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
const about = ({ evnt }) => {
    console.log(evnt);
    return (
        <Layout>
            <main>slug page</main>
        </Layout>
    );
};

export default about;
