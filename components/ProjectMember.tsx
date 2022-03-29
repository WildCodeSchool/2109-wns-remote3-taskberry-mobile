import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import image from "../constants/Images";

interface IProjectMember {
  leftMargin: number;
  isPlaceholder?: boolean;
  picture?: string;
  membersCount?: number;
}

export default function ProjectMember({
  leftMargin,
  isPlaceholder,
  picture,
  membersCount,
}: IProjectMember) {
  const projectMemberStyle = {
    ...styles.container,
    left: leftMargin,
    position: isPlaceholder ? "relative" : "absolute",
  };

  return (
    <View style={projectMemberStyle}>
      {isPlaceholder ? (
        <Text>+{membersCount}</Text>
      ) : (
        <Image
          source={{
            uri: picture ? picture : image.avatar_4,
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "#dadada",
    borderRadius: 100,
    alignSelf: "flex-end",
  },
});
