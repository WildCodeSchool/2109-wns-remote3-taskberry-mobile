import { createContext, FC, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

interface IProjectContext {
  projects: Project[] | [] | null;
}

const defaultContextValues: IProjectContext = {
  projects: null,
};

const GET_USER_PROJECTS = gql`
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
`;

export const ProjectContext =
  createContext<IProjectContext>(defaultContextValues);

export const ProjectProvider: FC = ({ children }: any) => {
  const [projects, setProjects] = useState(null);

  const { error, data } = useQuery(GET_USER_PROJECTS, {
    variables: {
      userId: 1,
    },
  });

  useEffect(() => {
    if (data) {
      const { getUserProjects } = data;
      setProjects(getUserProjects);
    }
    if (error) {
      throw new Error(error.message);
    }
  }, [data, error]);

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  );
};
