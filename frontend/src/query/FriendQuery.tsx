import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
    mutation AddFriend($inputFriend: InputFriend!){
  addFriend(inputFriend: $inputFriend){
    user_one
    user_two
    status
  }
}
`

export const CONFIRM_FRIEND_REQUEST = gql`
    mutation ConfirmFriendRequest($inputFriend: InputFriend!){
  confirmFriendRequest(inputFriend: $inputFriend){
    user_one
    user_two
    status
  }
}
`

export const REMOVE_FRIEND_REQUEST = gql`
    mutation RemoveFriendRequest($inputFriend: InputFriend!){
  removeFriendRequest(inputFriend: $inputFriend){
    user_one
    user_two
    status
  }
}
`

export const GET_FRIEND = gql`
    query GetFriend($id: ID!){
  getFriend(id: $id){
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

export const GET_PEOPLE_YOU_MIGHT_KNOW = gql`
    query GetPeopleYouMayKnow($id: ID!){
  getPeopleYouMayKnow(id: $id){
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

export const GET_FRIEND_REQUEST = gql`
  query GetFriendRequest($id: ID!){
  getFriendRequest(id: $id){
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

export const IS_FRIEND = gql`
  query IsFriend($inputFriend: InputFriend!){
  isFriend(inputFriend: $inputFriend)
}
`
export const GET_MUTUALS = gql`
  query GetMutuals($inputFriend: InputFriend!){
  getMutuals(inputFriend: $inputFriend){
    id
  }
}
`