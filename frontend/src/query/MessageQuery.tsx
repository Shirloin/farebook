import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($inputMessage: NewMessage!){
  createMessage(inputMessage: $inputMessage){
    id
    message
    type
  }
}
`

export const MESSAGE_CREATED = gql`
    subscription MessageCreated($userId: String!, $roomId: String!){
  messageCreated(userId: $userId, roomId: $roomId){
    id
    message
    type
    user{
      id
      firstname
      lastname
      email
      dob
      gender
      image
    }
    room{
      id
      user_one{
      id
      firstname
      lastname
      email
      dob
      gender
      image
  }
      user_two{
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

export const GET_ROOM = gql`
  query GetRoom($inputRoom: NewRoom!){
  getRoom(inputRoom: $inputRoom){
    id
     user_one{
      id
      firstname
      lastname
      email
      dob
      gender
      image
  }
    user_two{
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
`