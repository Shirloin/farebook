import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($inputPost: NewPost!){
  createPost(inputPost: $inputPost){
    id
    content
    file{
      id
      name
      type
    }
    createdAt
  }
}
`

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!){
  deletePost(id: $id){
    id
    content
    file{
      id
      name
      type
    }
    createdAt
  }
}
`

export const GET_POST = gql`
    query GetPost($id: ID!){
  getPost(id: $id){
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
    file{
      id
      name
      type
    }
    createdAt
    comment{
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
      parent{
        id
      }
      replies{
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
  }
}
`
export const GET_USER_POST = gql`
    query GetUserPost($id: ID!){
  getUserPost(id: $id){
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
    file{
      id
      name
      type
    }
    createdAt
    comment{
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
      parent{
        id
      }
      replies{
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
  }
}
`

export const GET_ALL_POST = gql`
    query GetAllPost{
  getAllPost{
  	id
    content
    file{
      id
      name
      type
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
    createdAt
    privacy
    comment{
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
      parent{
        id
      }
      replies{
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
        replies{
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
    }
  }
}
`

export const GET_SEARCH_POST = gql`
  query GetSearchPost($str: String!){
  getSearchPost(str: $str){
  	id
    content
    file{
      id
      name
      type
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
    createdAt
    privacy
    comment{
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
      parent{
        id
      }
      replies{
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
        replies{
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
    }
  }
}
`

export const GET_LIMIT_POSTS = gql`
  query GetLimitPosts($limit: Int!, $after: String){
  getLimitPosts(limit: $limit, after: $after){
    edges{
      cursor
      node{
        id
        content
        file{
          id
          name
          type
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
        createdAt
        comment{
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
				privacy
        group{
        id
        name
        privacy
        image
      }
      }
    }
    pageInfo{
      endCursor
      hasNextPage
    }
  }
}
`

export const UPDATE_POST_PRIVACY = gql`
  mutation UpdatePostPrivacy($id: ID!, $privacy: String!){
    updatePostPrivacy(id: $id, privacy: $privacy){
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
      file{
        id
        name
        type
      }
      createdAt
    }
  }
`

export const GET_GROUP_POST = gql`
  query GetGroupPost($id: ID!){
    getGroupPost(id: $id){
      id
      content
      file{
        id
        name
        type
      }
      user{
        id
        firstname
        lastname
        image
      }
      createdAt
      privacy
      group{
        id
        name
        privacy
        image
      }
    }
  }
`