import { gql } from "@apollo/client";

export default {
  query: {
    GET_PROJECT_TICKETS: gql`
      query Query($projectId: Float!) {
        getProjectTickets(projectId: $projectId) {
          id
          name
          description
          createdAt
          finishedAt
          projectId
          statusId
          assigneeId
        }
      }
    `,

    GET_USER_PROJECTS: gql`
      query GetUsers($userId: Float!) {
        getUserProjects(userId: $userId) {
          id
          name
          description
          createdAt
          finishedAt
          estimateEndAt
        }
      }
    `,

    GET_PROJECT_MEMBERS: gql`
      query Query($projectId: Float!) {
        getProjectUsers(projectId: $projectId) {
          email
          profilePicture
        }
      }
    `,
    GET_TICKET_COMMENTS: gql`
      query Query($ticketId: Float!) {
        getTicketComments(ticketId: $ticketId) {
          id
          description
          createdAt
          ticketId
          userId
          User {
            profilePicture
            firstName
          }
        }
      }
    `,
  },
  mutation: {
    UPDATE_TICKET: gql`
      mutation Mutation($partialInput: PartialUpdateTicketInput!) {
        updateTicket(partialInput: $partialInput) {
          id
          name
          description
          finishedAt
          statusId
          projectId
          assigneeId
        }
      }
    `,
    CREATE_COMMENT: gql`
      mutation Mutation($commentInput: CommentInput!) {
        createComment(commentInput: $commentInput) {
          id
          description
          createdAt
          ticketId
          userId
          User {
            profilePicture
            firstName
          }
        }
      }
    `,
  },
};
