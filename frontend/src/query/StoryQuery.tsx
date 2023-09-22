import { gql } from "@apollo/client";

export const CREATE_STORY = gql`
    mutation CreateStory($inputStory: NewStory!){
  createStory(inputStory: $inputStory){
    id
    content
    user{
      id
      firstname
      lastname
      email
      dob
      gender
      image
    }
    createdAt
    privacy
  }
}
`

export const GET_MY_STORY = gql`
    query GetMyStory($id: String!){
  getMyStory(id: $id){
    id
    content
    user{
      id
      firstname
      lastname
      email
      dob
      gender
      image
    }
    createdAt
    privacy
  }
}
`

export const GET_FRIEND_STORY = gql`
    query GetFriendStory($id: String!){
  getFriendStory(id: $id){
    id
    content
    user{
      id
      firstname
      lastname
      email
      dob
      gender
      image
    }
    createdAt
    privacy
  }
}
`

export const GET_STORY = gql`
  query GetMyStory($id: String!){
  getMyStory(id: $id){
    id
    content
    user{
      id
      firstname
      lastname
      email
      dob
      gender
      image
      stories{
        id
        content
      }
    }
    createdAt
    privacy
  }
}
`

export const GET_STORY_BY_USER = gql`
  query GetStoryByUser($id: String!){
    getStoryByUser(id: $id){
      id
      firstname
      lastname
      image
      stories{
        id
        content
        createdAt
        privacy
      }
    }
  }
`

export const GET_STORY_BY_FRIEND = gql`
  query GetStoryByFriend($id: String!){
    getStoryByFriend(id: $id){
      id
      firstname
      lastname
      image
      stories{
        id
        content
        createdAt
        privacy
      }
    }
  }
`