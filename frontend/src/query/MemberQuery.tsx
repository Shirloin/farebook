import { gql } from "@apollo/client";

export const JOIN_GROUP = gql`
    mutation JoinGroup($inputMember: NewMember!){
        joinGroup(inputMember: $inputMember){
            id
            user{
            id
            firstname
            lastname
            image
            }
            role
            joinedAt
        }
    }
`

export const IS_MEMBER = gql`
    query IsMember($groupId: ID!, $userId: ID!){
  isMember(groupId: $groupId, userId: $userId)
}
`

export const INVITE_MEMBER = gql`
    mutation InviteMember($groupId: ID!, $userId: ID!, $memberId: ID!){
  inviteMember(groupId: $groupId, userId: $userId, memberId: $memberId){
    id
    user{
      id
      image
    }
    role
    joinedAt
    group{
      id
    }
    confirmed
  }
}
`

export const CONFIRM_MEMBER = gql`
    mutation ConfirmMember($id: ID!){
  confirmMember(id: $id){
    id
    user{
      id
    }
    role
    joinedAt
    group{
      id
    }
    confirmed
  }
}
`

export const DELETE_MEMBER =  gql`
    mutation DeleteMember($id: ID!){
        deleteMember(id: $id){
            id
            user{
            id
            }
            role
            joinedAt
            group{
            id
            }
            confirmed
        }
    }
`

export const GET_MEMBER = gql`
    query GetMember($id: ID!){
  getMember(id: $id){
    id
    user{
      id
      firstname
      lastname
      image
    }
    role
    joinedAt
    group{
      id
    }
    confirmed
  }
}
`

export const GET_ADMIN = gql`
    query GetAdmin($id: ID!){
  getAdmin(id: $id){
    id
    user{
      id
      firstname
      lastname
      image
    }
    role
    joinedAt
    group{
      id
    }
    confirmed
  }
}
`

export const IS_MEMBER_BY_ID = gql`
    query isMemberById($id: ID!){
  isMemberById(id: $id)
}
`

export const GET_NON_MEMBER_FRIEND = gql`
  query GetNonMemberFriend($id: ID!, $groupId: ID!){
  getNonMemberFriend(id: $id, groupId: $groupId){
    id
    firstname
    lastname
    email
    dob
    gender
    image
  }
}
`

export const LEAVE_GROUP =  gql`
  mutation LeaveGroup($groupId: ID!, $userId: ID!){
    leaveGroup(groupId: $groupId, userId: $userId){
      id
      user{
        id
      }
      role
      joinedAt
      group{
        id
      }
      confirmed
    }
  }
`

export const PROMOTE_MEMBER = gql`
  mutation PromoteMember($id: ID!){
    promoteMember(id: $id){
      id
      user{
        id
      }
      role
      joinedAt
      group{
        id
      }
      confirmed
    }
  }
`

export const IS_ADMIN = gql`
  query IsAdmin($groupId: ID!, $userId: ID!){
    isAdmin(groupId: $groupId, userId: $userId)
  }
`