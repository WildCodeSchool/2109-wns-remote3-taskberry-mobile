import { FC } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";
import color from "../constants/Colors";
import Ticket from "./Ticket";
import image from "../constants/Images";

interface TicketColumnProps {
  title: string;
  tickets: Ticket[] | undefined;
}

interface TicketItem {
  item: Ticket;
}

const TicketColumn: FC<TicketColumnProps> = ({ title, tickets }) => {
  const TicketItem: FC<TicketItem> = ({ item }: TicketItem) => {
    return (
      <Ticket leader={image.avatar_4} title={`#${item.id} ${item.name}`} />
    );
  };

  return (
    <View style={styles.ticketWrapper}>
      <View style={styles.ticketLabel}>
        <Text style={styles.columnTitle}>{title}</Text>
      </View>
      <FlatList data={tickets} renderItem={TicketItem} overScrollMode="never" />
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
