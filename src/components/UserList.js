import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
require("dotenv").config();

const UserList = ({ user, isLoading }) => {
    var arr = [];
    const [repos, setRepos] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const setModalState = async () => {
        setIsOpen(!isOpen);
        arr = JSON.parse(localStorage.getItem("users")) || [];
        arr.push(user);
        localStorage.setItem("users", JSON.stringify(arr));
    };
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            background: "#333",
            color: "white",
            width: "auto",
            borderRadius: "1.2em",
            transition: "transform 2s",
            height: "auto",
            overflow: "hidden",
            transform: "translate(-50%, -50%)",
        },
    };
    useEffect(() => {
        const fetchRepos = async () => {
            const { data } = await axios.get(
                `https://api.github.com/users/${user.login}/repos?page=1&per_page=5`
                // {
                //     headers: {
                //         authorization: `token ${process.env.auth_token}`,
                //     },
                // }
            );
            setRepos(data);
        };

        fetchRepos();
    }, [user]);

    return isLoading ? (
        " "
    ) : (
        <>
            <div onClick={setModalState} className="card">
                <div className="avatar center">
                    <img src={user.avatar_url} alt="user pic" />
                </div>
                <div className="user-details">
                    <h2 className="center">{user.login}</h2>
                </div>
                <div className="repos center">
                    {repos == null
                        ? "No Repositories present"
                        : repos.map((repo, index) => {
                              return (
                                  <a target="blank" href={repo.html_url}>
                                      {repo.name}
                                  </a>
                              );
                          })}
                </div>
            </div>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={setModalState}
                shouldCloseOnEsc={true}
                ariaHideApp={false}
                style={customStyles}
                closeTimeoutMS={1}
                contentLabel="User Added"
            >
                <div className="react-modal">
                    <h1>User Added Successfully</h1>
                </div>
                <i className="btn-close" onClick={setModalState}>
                    &times;
                </i>
            </ReactModal>
        </>
    );
};

export default UserList;
