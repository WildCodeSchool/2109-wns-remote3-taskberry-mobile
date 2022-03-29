import React from "react";
import { Member } from "./Project";
import ProjectMember from "./ProjectMember";
import { View } from "react-native";

interface IProjectMemberStack {
  members: Member[];
}

export default function ProjectMemberStack({ members }: IProjectMemberStack) {
  return (
    <>
      {members.map((t, index) => (
        <View key={index}>
          {index < 3 && (
            <ProjectMember picture={t.profilePicture} leftMargin={index * 24} />
          )}

          {index === 4 && (
            <ProjectMember
              membersCount={members.length - 3}
              leftMargin={3 * 24}
              isPlaceholder={true}
            />
          )}
        </View>
      ))}
    </>
  );
}
