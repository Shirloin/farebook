import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
    mutation CreateGroup($inputGroup: NewGroup!){
        createGroup(inputGroup: $inputGroup){
            id
            name
            privacy
            image
            createdAt
        }
    }
`

export const UPDATE_GROUP = gql`
    mutation UpdateGroup($id: ID!, $inputGroup: NewGroup!){
        updateGroup(id: $id, inputGroup: $inputGroup){
            id
            name
            privacy
            image
            createdAt
        }
    }
`

export const DELETE_GROUP = gql`
    mutation DeleteGroup($id: ID!){
        deleteGroup(id: $id){
            id
            name
            privacy
            image
            createdAt
        }
    }
`

export const GET_MY_GROUP = gql`
    query GetMyGroup($id: ID!){
        getMyGroup(id: $id){
            id
            name
            privacy
            image
            createdAt
            members{
            id
            user{
                id
                firstname
                lastname
                email
                dob
                gender
                image
            }
            role
            joinedAt
            }
        }
    }
`

export const GET_ALL_GROUP = gql`
    query GetAllGroup{
        getAllGroup{
            id
            name
            privacy
            image
            createdAt
            members{
            id
            user{
                id
                firstname
                lastname
                email
                dob
                gender
                image
            }
            role
            joinedAt
            }
        }
    }
`

export const GET_GROUP = gql`
    query GetGroup($id: ID!){
        getGroup(id: $id){
            id
            name
            privacy
            image
            createdAt
            members{
                id
                user{
                    id
                    firstname
                    lastname
                    email
                    dob
                    gender
                    image
                }
                role
                joinedAt
            }
        }
    }
`