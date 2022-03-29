import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@apollo/client";
import API from "../constants/API";

interface IProjectContext {
  projects: Project[] | [] | null;
  projectId: number | null;
  setProjectId: Dispatch<SetStateAction<number | null>>;
}

const defaultContextValues: IProjectContext = {
  projects: null,
  projectId: null,
  setProjectId: () => {},
};

export const ProjectContext =
  createContext<IProjectContext>(defaultContextValues);

export const ProjectProvider: FC<{ children: any }> = ({ children }: any) => {
  const [projects, setProjects] = useState(null);
  const [projectId, setProjectId] = useState<number | null>(null);

  const { error, data } = useQuery(API.query.GET_USER_PROJECTS, {
    variables: {
      userId: 1,
    },
    pollInterval: 500,
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
    <ProjectContext.Provider value={{ projects, projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};
