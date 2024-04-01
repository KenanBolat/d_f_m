import { useState, useEffect } from "react";
import axios from "../Api/axios";


const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axios.get("users", {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
        
        return () => {
            isMounted = false;
            controller.abort();
        };
        
    }, []);

  return (
    <article>
        <h2>Users</h2>
        {users?.length ? (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
         ) : <p>No users to display...</p>
        }
    </article>
  );
};

export default Users
