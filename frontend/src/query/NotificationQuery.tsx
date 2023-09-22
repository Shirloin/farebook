import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
    mutation CreateNotification($inputNotif: NewNotification!){
        createNotification(inputNotif: $inputNotif){
            id
            sender{
                id
                firstname
                lastname
                image
            }
            receiver{
                id
                firstname
                lastname
                image
            }
            message
            content
            type
            createdAt
            status
        }
    }
`

export const UPDATE_NOTIFICATION_STATUS = gql`
    mutation UpdateNotificatonStatus($id: ID!){
        updateNotificationStatus(id: $id){
            id
            sender{
                id
                firstname
                lastname
                image
            }
            receiver{
                id
                firstname
                lastname
                image
            }
            message
            content
            type
            createdAt
            status
        }
    }
`

export const GET_NOTIFICATION = gql`
    query GetNotification($id: ID!){
        getNotification(id: $id){
            id
            sender{
            id
                firstname
                lastname
                image
            }
            receiver{
                id
                firstname
                lastname
                image
            }
            message
            content
            type
            createdAt
            status
        }
    }
`