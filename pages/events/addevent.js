import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Link from "next/link";
import slug from "slugify";
import styles from "@/styles/Addevent.module.css";
import { useRouter } from "next/router";

const Addevent = () => {
    const router = useRouter();
    const [values, setvalues] = useState({
        name: "",
        performers: "",
        venue: "",
        description: "",
        date: "",
        time: "",
        address: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkEmptyFields = Object.values(values).some(
            (element) => element === ""
        );
        if (checkEmptyFields) {
            toast.error("All fields should be filleds ");
        } else {
            const res = await fetch(`${API_URL}/events`, {
                method: "POST",
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
                            value={values.date}
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
                        cols="85"
                        name="description"
                        type="description"
                        placeholder="description of event"
                        value={values.description}></textarea>
                </div>

                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="btn_back">
                    Add Event
                </button>
            </form>
        </Layout>
    );
};

export default Addevent;
