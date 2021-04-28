import React, { useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children, title }) => {
    const [openBrowser, setOpenBrowser] = useState(false);

    useEffect(() => {
        setOpenBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };
    // const imageUploadBox = (
    //     <div className="overlay">
    //         <div className="modal">
    //             <div className="header">
    //                 <a onClick={handleClose}>
    //                     <FaTimes />
    //                 </a>
    //             </div>
    //             {title && <div>{title}</div>}
    //             <div className="content">{children}</div>
    //         </div>
    //     </div>
    // );

    const modelContent = show ? (
        <div className="overlay">
            <div className="modal">
                <div className="header">
                    <a onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className="content">{children}</div>
            </div>
        </div>
    ) : null;
    if (openBrowser) {
        return ReactDOM.createPortal(
            modelContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
};

export default Modal;
