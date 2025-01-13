import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../graphql/mutations";
import { GET_ALL_QUOTES } from "../graphql/queries";

export default function CreateQuote() {
  const [quote, setQuote] = useState();
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE,{
    refetchQueries: [
        'allQuotes',
        'getMyProfile'
    ]
  }); //apollo same query hone ke vjh se cache se he chizze utha leta hai we need to refecth
  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        quote: quote,
      },
    });
  };
  if (loading) <h1>Loading</h1>;
  if(data){
    console.log(data);
  }
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="green card-panel">{data.createQuote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          placeholder="Write you quote here"
          onChange={(e) => setQuote(e.target.value)}
        />
        <button className="btn green">Create</button>
      </form>
    </div>
  );
}
