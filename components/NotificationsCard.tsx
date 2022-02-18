import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

type Props = {
  date: string;
  text: string;
};

const Notifications: React.FC<Props> = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.textDate}>{props.date}</Text>
      <Text style={styles.textNotif}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
  },
  textDate: {
    fontSize: 13,
    fontWeight: "600",
    color: "grey",
  },
  textNotif: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Notifications;
