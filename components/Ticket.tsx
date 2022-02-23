import { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import color from "../constants/Colors";

interface TicketProps {
  leader: any;
  title: string;
}

const Ticket: FC<TicketProps> = ({ leader, title }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.lign1}>
        <Text style={styles.ticketTitle}>{title}</Text>
      </View>
      <View style={styles.lign2}>
        <Image
          source={leader}
          resizeMode="contain"
          style={{
            width: 50,
            height: 50,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  item: {
    backgroundColor: color.light.background,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  lign1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  lign2: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
