import { gql } from "@apollo/client";
export const GET_ALL_QUOTES = gql`
  query allQuotes {
    quotes {
      quote
      by {
        _id
        firstName
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query getMyProfile {
    user:myprofile {
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;

export const GET_PROFILE_BY_ID = gql`
  query getUserById($userid: ID!) {
    user(_id: $userid) {
      _id
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;
