import React from "react";
import Loading from "./Loading";
import UserList from "./UserList";

const SearchResult = ({ isLoading, data }) => {
    //console.log("data");
    //console.log(data);
    return isLoading ? (
        <Loading />
    ) : (
        <section className="center cards">
            {data &&
                data.map((user) => {
                    return <UserList isLoading={isLoading} user={user} />;
                })}
        </section>
    );
};

export default SearchResult;
