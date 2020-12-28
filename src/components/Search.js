import React, { useState } from "react";

const Search = ({ getQuery }) => {
  const [query, setQuery] = useState("");

  const onChange = (q) => {
    getQuery(q);
    setQuery(q);
  };
  return (
    <section className="center search-box">
      <input
        type="text"
        placeholder="Search user"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </section>
  );
};

export default Search;
