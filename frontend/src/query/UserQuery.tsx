/* eslint-disable react-refresh/only-export-components */
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($inputUser: NewUser!){
  createUser(inputUser: $inputUser){
    id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
  }
}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $inputUser: NewUser!){
  updateUser(id: $id, inputUser: $inputUser){
    id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
  }
}
`

export const LOGIN = gql`
    mutation Login($inputUser: OldUser!){
      login(inputUser: $inputUser){
        token
        user{
          id
          firstname
          lastname
          email
          dob
          gender
          image
          isVerified
        }
      }
    }
`

export const VERIFY_USER = gql`
  mutation VerifyUser($email: String!){
  verifyUser(email: $email){
    id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
  }
} 
`
export const GET_USER = gql`
  query GetUser($id: ID!){
    getUser(id: $id){
      id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
    }
  }
`

export const GET_ALL_USER = gql`
  query GetAllUser{
    getAllUser{
      id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
    }
  }
`

export const GET_SEARCH_USER = gql`
  query GetSearchUser($str: String!){
  getSearchUser(str: $str){
    id
    firstname
    lastname
    email
    dob
    gender
    image
    isVerified
  }
}
`
export const GET_LIMIT_USERS = gql`
query GetLimitUsers($limit: Int!, $after: String){
  getLimitUsers(limit: $limit, after: $after){
    pageInfo{
      endCursor
      hasNextPage
    }
    edges{
      cursor
      node{
        id
        firstname
        lastname
        email
        dob
        gender
        image
      }
    }
  }
}
`