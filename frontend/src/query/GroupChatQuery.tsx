import { gql } from "@apollo/client";

export const CREATE_GROUP_CHAT = gql`
    mutation CreateGroupChat($inputGroupChat: NewGroupChat!){
  createGroupChat(inputGroupChat: $inputGroupChat){
    id
    message
    type
    room{
      id
      group{
        id
        image
      }
    }
    user{
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

export const GROUP_CHAT_CREATED = gql`
    subscription GroupChatcreated($userId: ID!, $groupRoomId: ID!){
  groupChatCreated(userId: $userId, groupRoomId: $groupRoomId){
    id
    message
  	type
    room{
      id
      group{
        id
        image
      }
    }
    user{
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