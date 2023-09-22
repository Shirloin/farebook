import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
    mutation CreateComment($inputComment: NewComment!){
  createComment(inputComment: $inputComment){
    id
    text
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

export const GET_COMMENT = gql`
  query Getcomment($id: ID!){
    getComment(id: $id){
      id
      text
      user{
        id
        firstname
        lastname
        email
        dob
        gender
        image
      }
      post{
        id
      }
      parent{
        id
      }
      replies{
        id
        text
        parent{
          id
        }
        post{
          id
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
  }
`

export const GET_COMMENT_COUNT = gql`
  query GetCommentCount($id:ID!){
  getCommentCount(id: $id)
}
`