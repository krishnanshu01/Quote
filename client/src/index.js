import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const client = new ApolloClient({
//   uri: "http://localhost:2000",
//   cache: new InMemoryCache(),
//   headers:{
//     authorization: localStorage.getItem("token") || ""
//   }
// });

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Use setContext to dynamically set the Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); // Get the latest token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? localStorage.getItem("token") :  "",
    },
  };
});

// Combine authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
