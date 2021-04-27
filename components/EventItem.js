import Image from "next/image";
import styles from "../styles/EventItem.module.css";

const EventItem = ({ evnt }) => {
    return (
        <div className={styles.eventCard} key={evnt.id}>
            <div className={styles.cardimg}>
                {" "}
                <Image
                    src={evnt.image.formats.thumbnail.url}
                    alt="Picture of the author"
                    width={250}
                    height={250}
                />
            </div>

            <div className={styles.info}>
                <h2>{evnt.name}</h2>
                <h4>{evnt.date}</h4>
                <h4>
                    {evnt.venue} <span>{evnt.address}</span>
                </h4>
                <button className={styles.btnevent}>View Details</button>
            </div>
        </div>
    );
};

export default EventItem;
