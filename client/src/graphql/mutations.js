import { gql } from "@apollo/client";
export const SIGNUP = gql`
  mutation addUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN = gql`
  mutation usersignin($userSignin: SigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createNewQuote($quote: String!) {
    createQuote(quote: $quote)
  }
`;
