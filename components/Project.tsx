import * as React from "react";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import color from "../constants/Colors";
import image from "../constants/Images";

const Project = (props: any) => {

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
        }
     ]
    
    const [members, setMembers] = React.useState(membersData);

    const renderItem = ({item} : any)=> {
        return (
            <View>
                <Image
                   source={item.icon} 
                   resizeMode = "contain"
                   style = {{
                       width : 50,
                       height : 50,
                   }}
                />
            </View>
        )
    }

  return (
    <View style={styles.item}>
      <View style={styles.lign1}>
        <View style={styles.description}>
          <Text style={styles.projectTitle}>{props.title}</Text>
          <Text style={styles.projectDate}>Date : {props.date}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>Chef de projet :</Text>
          <Image
            source={props.leader}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
      </View>
      <View >
        <Text>Équipe :</Text>
          <FlatList
            data={members}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
          />
        
      </View>
    </View>
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
  }
});
