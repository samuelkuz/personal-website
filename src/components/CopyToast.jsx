import React from "react";

import "./CopyToast.scss";

function CopyToast({ show, message = "Copied to clipboard" }) {
    return (
        <div aria-live="polite" className={`copy-toast${show ? " visible" : ""}`}>
            {message}
        </div>
    );
}

export default CopyToast;
