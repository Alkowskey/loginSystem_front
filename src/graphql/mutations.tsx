import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(user: { username: $username, password: $password })
  }
`;
