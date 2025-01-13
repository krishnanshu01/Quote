import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_QUOTES } from "../graphql/queries";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) {
    return <h3>Loading</h3>;
  }
  if (error) {
    console.log({ error: error.message });
  }

  return (
    <div className="container">
      {data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.quote}</h6>
            <Link to={`/profile/${quote.by._id}`}><p className="right-align">~{quote.by.firstName}</p></Link>
          </blockquote>
        );
      })}
    </div>
  );
}
