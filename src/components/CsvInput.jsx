import React, { useRef } from "react";

export const CsvInput = ({ handleFileChange }) => {
    const csvRef = useRef(null);

    const handleChange = e => {
        var file = csvRef.current.files[0];
        if (!file) return;

        handleFileChange(file);
    };
    return (
        <form className="csv-form">
            <div className="csv-form-group">
                <input
                    type="file"
                    className="csv-form-control"
                    id="file"
                    accept=".csv"
                    onChange={handleChange}
                    ref={csvRef}
                />
            </div>
        </form>
    );
}

