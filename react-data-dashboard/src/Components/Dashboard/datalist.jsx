import React, {useState, useEffect, useContext} from "react";
import axiosInstance from "../LoginForm/axios";
import {useAuth} from "../../Contexts/AuthProvider";

const DataList = () => {
    let [data, setData] = useState([]);
    let {auth, setAuth} = useAuth()

    useEffect(() => {
        getData();
    }, []);

    let getData = () => {
        axiosInstance.get("/file_converted2").catch((err) => {
            console.log(err);
        }
        ).then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }
    const fileDetails = {
        id: 1,
        data: "Sample data",
        file_name: "example.txt",
        file_path: "/path/to/example.txt",
        file_date: "2021-07-16",
        file_size: "2MB",
        file_type: "text",
        file_status: "active",
        is_active: true,
        download_url: "http://example.com/download",
        downloaded_at: "2021-07-17",
        mongo_id: "abc123"
      };

    return ( 
        <div>
            <h1>Data List</h1>
            <p> You are logged in to this page!</p>
            <ul>
                {/* {data.map((item, index) => {
                    return <li key={index}>{item}</li>
                })} */}
                {data.map((item, index) => {
                    return <li key={index}>{item.file_name}</li>

                }
                )}
                
            </ul>
        </div>
        );
}


export default DataList;
