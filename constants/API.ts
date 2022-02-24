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
  },
};
