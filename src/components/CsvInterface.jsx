import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import {CsvInput} from "./CsvInput";

export const CsvInterface= () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data.length && columns.length) setLoading(false);
    }, [data, columns]);

    const handleFileChange = file => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: handleDataChange
        });
    };

    const makeColumns = rawColumns => {
        return rawColumns.map(column => {
            return { Header: column, accessor: column };
        });
    };

    const handleDataChange = file => {
        setData(file.data);
        setColumns(makeColumns(file.meta.fields));
    };

    return (
        <div>
            <CsvInput handleFileChange={handleFileChange} data={data} />
            {!loading && (
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            )}
        </div>
    );
}
