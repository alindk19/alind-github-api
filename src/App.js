/* eslint-disable no-unreachable */
import { useState, useEffect } from "react";
import "./App.css";
import Error from "./components/Error";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import logo1 from "./images/github-icon.png";
import logo2 from "./images/github.png";
import axios from "axios";
require("dotenv").config();

function App() {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const perpage = 4;

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);

            if (query === "") {
                try {
                    const fetchData = await axios.get(
                        `https://api.github.com/users?since=${page}&per_page=${perpage}`
                        // {
                        //     headers: {
                        //         authorization: `token ${process.env.auth_token}`,
                        //     },
                        // }
                    );
                    setData(fetchData.data);
                    //console.log(fetchData.data.length);
                } catch (err) {
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                try {
                    const { data } = await axios.get(
                        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perpage}`,
                        {
                            headers: {
                                authorization: `token ${process.env.auth_token}`,
                            },
                        }
                    );
                    setData(data.items);
                } catch (err) {
                    console.log(err);
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchUsers();
    }, [query, page]);

    return (
        <>
            <header className="center">
                <img className="logo" src={logo1} alt="github logo" />
                <img src={logo2} alt="github logo" />
                <h3 className="added-users">
                    Users Added :{" "}
                    {JSON.parse(localStorage.getItem("users")).length / 2}
                </h3>
            </header>
            <Search getQuery={(q) => setQuery(q)} />
            <div className="main">
                {error && <Error />}
                <SearchResult isLoading={isLoading} data={data} />
            </div>
            <footer className="center">
                <button onClick={() => setPage(page - 3)}>Prev</button>
                <button onClick={() => setPage(page + 3)}>Next</button>
            </footer>
        </>
    );
}

export default App;
