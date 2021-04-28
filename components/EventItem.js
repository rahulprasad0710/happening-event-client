import Image from "next/image";
import Link from "next/link";
import styles from "../styles/EventItem.module.css";

const EventItem = ({ evnt }) => {
    return (
        <div className={styles.eventCard} key={evnt.id}>
            <div className={styles.cardimg}>
                {!evnt.image && (
                    <img
                        src="/default.jpg"
                        alt="default logo"
                        width={250}
                        height={250}
                    />
                )}
                {evnt.image && (
                    <Image
                        src={evnt.image.formats.thumbnail.url}
                        alt={evnt.name}
                        width={250}
                        height={250}
                    />
                )}
            </div>

            <div className={styles.info}>
                <h2>{evnt.name}</h2>
                <p className="text-muted">
                    {new Date(evnt.date).toLocaleDateString("en-UK")}
                </p>
                <p className="text-muted">
                    {evnt.venue} <span>{evnt.address}</span>
                </p>

                <Link href={`/events/${evnt.slug}`}>
                    <button className={styles.btnevent}>View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default EventItem;
