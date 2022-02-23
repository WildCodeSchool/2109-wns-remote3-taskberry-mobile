import { StyleSheet, View, Text, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import Project from "../components/Project";
import image from "../constants/Images";
import { ProjectContext } from "../providers/ProjectProvider";
import { useContext } from "react";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"Projets">) {
  const { projects } = useContext(ProjectContext);

  const projectItem = ({ item }: { item: Project }) => {
    return (
      <Project
        title={item.name}
        date={item.createdAt}
        leader={image.avatar_4}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={projectItem}
        contentContainerStyle={styles.contentContainer}
        overScrollMode="never"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 24,
  },
});
