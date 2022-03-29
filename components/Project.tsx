import { useState, FC, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import color from "../constants/Colors";
import { format } from "date-fns";
import { ProjectContext } from "../providers/ProjectProvider";
import { useQuery } from "@apollo/client";
import API from "../constants/API";
import AppLoading from "expo-app-loading";
import ProjectMemberStack from "./ProjectMemberStack";

interface ProjectProps {
  projectId: number;
  date: string;
  title: string;
  leader: any;
  navigation: any;
}

export interface Member {
  email: string;
  profilePicture: string;
}

const Project: FC<ProjectProps> = ({
  date,
  title,
  leader,
  projectId,
  navigation,
}) => {
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const { setProjectId } = useContext(ProjectContext);

  const handlePressProject = () => {
    setProjectId(projectId);
    navigation.navigate("Tickets");
  };

  const { error, data, loading } = useQuery(API.query.GET_PROJECT_MEMBERS, {
    variables: {
      projectId: Number(projectId),
    },
    pollInterval: 500,
  });

  useEffect(() => {
    if (data) {
      const { getProjectUsers } = data;
      setProjectMembers(getProjectUsers);
    }
    if (error) {
      throw new Error(error.message);
    }
  }, [data, error]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity style={styles.projectItem} onPress={handlePressProject}>
      <View style={styles.projectItemDetails}>
        <View style={styles.description}>
          <Text style={styles.projectTitle}>{title}</Text>
          {date && (
            <Text style={styles.projectDate}>
              Date: {format(new Date(date), "d-MM-yyyy")}
            </Text>
          )}
        </View>
      </View>

      {projectMembers && projectMembers.length > 0 && (
        <View style={styles.projectItemDetails}>
          <View style={styles.projectMembersContainer}>
            <Text>Équipe :</Text>
            <View style={{ flexDirection: "row" }}>
              <ProjectMemberStack members={projectMembers} />
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text>Chef de projet :</Text>
            <Image
              source={leader}
              resizeMode="contain"
              style={styles.placeholder}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Project;

const styles = StyleSheet.create({
  projectItem: {
    backgroundColor: color.light.lightGrey,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    alignItems: "flex-start",
  },
  projectItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  projectDate: {
    fontSize: 12,
    marginBottom: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  projectMembersContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
