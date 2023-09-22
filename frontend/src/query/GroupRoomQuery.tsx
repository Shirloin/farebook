import { gql } from "@apollo/client";

export const CREATE_GROUP_ROOM = gql`
    mutation CreateGroupRoom($id: ID!){
  createGroupRoom(id: $id){
    id
    group{
      id
    }
  }
}
`

export const DELETE_GROUP_ROOM = gql`
    mutation DeleteGroupRoom($id: ID!){
  deleteGroupRoom(id: $id){
    id
    group{
      id
    }
  }
}
`

export const GET_GROUP_ROOM = gql`
    query GetGroupRoom($id: ID!){
  getGroupRoom(id: $id){
    id
    group{
      id
      name
      image
    }
  }
}
`

export const GET_MY_GROUP_ROOM = gql`
    query GetMyGroupRoom($id: ID!){
  getMyGroupRoom(id: $id){
    id
    group{
      id
      name
      image
    }
  }
}
`