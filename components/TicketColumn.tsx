import { FC } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import color from "../constants/Colors";
import Ticket from "./Ticket";
import image from "../constants/Images";

interface TicketColumnProps {
  title: string;
}

const TicketColumn: FC<TicketColumnProps> = ({ title }) => {
  return (
    <View style={styles.ticketWrapper}>
      <View style={styles.ticketLabel}>
        <Text style={styles.columnTitle}>{title}</Text>
      </View>
      <ScrollView overScrollMode="never">
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
        <Ticket
          leader={image.avatar_4}
          title={"#21 Intégrer la barre de navigation dans la page home"}
        />
      </ScrollView>
    </View>
  );
};

export default TicketColumn;

let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  ticketWrapper: {
    width: screenWidth - 40,
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: color.light.lightGrey,
  },
  ticketLabel: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: color.light.darkPurple,
    alignSelf: "flex-end",
    marginTop: -15,
    marginRight: 20,
    justifyContent: "center",
  },
  columnTitle: {
    fontWeight: "700",
    color: color.light.background,
    fontSize: 18,
    alignSelf: "center",
  },
  item: {
    backgroundColor: color.light.background,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
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
