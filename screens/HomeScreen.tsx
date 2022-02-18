import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Project from '../components/Project';
import image from '../constants/Images';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Projets'>) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.projectsWrapper}>
        <Project
          title={"Express projet"}
          date={"10/12/2021"}
          leader={image.avatar_4}
        />
        <Project
          title={"React projet"}
          date={"11/11/2022"}
          leader={image.avatar_4}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  projectsWrapper: {
    padding : 20,
  },
  sectionTitle :{
    fontSize : 24,
  }
});
