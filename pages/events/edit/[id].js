import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { API_URL } from "@/config/index";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import Link from "next/link";
import Modal from "@/components/Modal.js";
import moment from "moment";
import styles from "@/styles/Addevent.module.css";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params: { id } }) => {
    console.log(id);
    const res = await fetch(`${API_URL}/events/${id}`);
    const evnt = await res.json();
    return {
        props: {
            evnt,
        },
    };
};
const EditEventPage = ({ evnt }) => {
    const [imagePreview, setImagePreview] = useState(null);
    console.log(evnt);
    const router = useRouter();
    const [values, setvalues] = useState({
        name: evnt.name,
        performers: evnt.performers,
        venue: evnt.venue,
        description: evnt.description,
        date: evnt.date,
        time: evnt.time,
        address: evnt.address,
    });

    const [showModal, setshowModal] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkEmptyFields = Object.values(values).some(
            (element) => element === ""
        );
        if (checkEmptyFields) {
            toast.error("All fields should be filleds ");
        } else {
            const res = await fetch(`${API_URL}/events/${evnt.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (!res.ok) {
                toast.error("something went wrong. Try again");
            } else {
                const evnt = await res.json();

                router.push(`/events/${evnt.slug}`);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvalues({ ...values, [name]: value });
    };

    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/events/${evnt.id}`);
        const data = await res.json();
        console.log(data);
        setImagePreview(data.image.formats.thumbnail.url);
        setshowModal(false);
    };
    return (
        <Layout>
            <Link href="/">
                <button className="btn_back">Go back</button>
            </Link>
            <ToastContainer position="top-center" />
            <form className={styles.formbox} onSubmit={handleSubmit}>
                <div className={styles.gird_container}>
                    <div className="form-group">
                        <label htmlFor="name">Event Name: </label>
                        <input
                            onChange={handleInputChange}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="name of event"
                            value={values.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="performers">Performers: </label>

                        <input
                            onChange={handleInputChange}
                            id="performers"
                            name="performers"
                            type="text"
                            placeholder="performers of event"
                            value={values.performers}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue: </label>
                        <input
                            onChange={handleInputChange}
                            id="venue"
                            name="venue"
                            type="text"
                            placeholder="venue of event"
                            value={values.venue}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            onChange={handleInputChange}
                            id="address"
                            name="address"
                            type="text"
                            placeholder="address of event"
                            value={values.address}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            onChange={handleInputChange}
                            id="date"
                            name="date"
                            type="date"
                            value={moment(values.date).format("yyyy-MM-DD")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time: </label>
                        <input
                            onChange={handleInputChange}
                            id="time"
                            name="time"
                            type="time"
                            value={values.time}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <br />
                    <textarea
                        onChange={handleInputChange}
                        id="description"
                        rows="10"
                        cols="45"
                        name="description"
                        type="description"
                        placeholder="description of event"
                        value={values.description}></textarea>
                </div>

                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="btn_back">
                    Submit Changes
                </button>
            </form>
            <div className="image_preview">
                <h2>Event Image</h2>
                {imagePreview ? (
                    <Image src={imagePreview} width={200} height={200} />
                ) : (
                    <h2>No image upload</h2>
                )}
                <button onClick={() => setshowModal(true)} className="btn_back">
                    <FaImage /> Upload Image
                </button>
                <Modal show={showModal} onClose={() => setshowModal(false)}>
                    <ImageUpload
                        evtID={evnt.id}
                        imageUploaded={imageUploaded}
                    />
                </Modal>
            </div>
        </Layout>
    );
};

export default EditEventPage;
