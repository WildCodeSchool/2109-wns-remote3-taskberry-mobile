import { useState, FC } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import color from "../constants/Colors";
import image from "../constants/Images";
import { format } from "date-fns";

interface ProjectProps {
  date: string;
  title: string;
  leader: any;
}

const Project: FC<ProjectProps> = ({ date, title, leader }) => {
  const membersData = [
    {
      id: 1,
      name: "Anne",
      icon: image.avatar_1,
    },
    {
      id: 2,
      name: "Jane",
      icon: image.avatar_2,
    },
    {
      id: 3,
      name: "John",
      icon: image.avatar_3,
    },
  ];

  const [members, setMembers] = useState(membersData);

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            width: 50,
            height: 50,
          }}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.lign1}>
        <View style={styles.description}>
          <Text style={styles.projectTitle}>{title}</Text>
          {date && (
            <Text style={styles.projectDate}>
              Date: {format(new Date(date), "d-MM-yyyy")}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text>Équipe :</Text>
          <FlatList
            data={members}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>Chef de projet :</Text>
          <Image
            source={leader}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Project;

const styles = StyleSheet.create({
  item: {
    backgroundColor: color.light.lightGrey,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    alignItems: "flex-start",
  },
  lign1: {
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
});
