import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      token
    }
  }
`;
