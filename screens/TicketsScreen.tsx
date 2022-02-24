import { StyleSheet, Dimensions, Animated, SafeAreaView } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import TicketColumn from "../components/TicketColumn";
import color from "../constants/Colors";
// @ts-ignore
import RNAnimatedScrollIndicators from "react-native-animated-scroll-indicators";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import API from "../constants/API";
import { ProjectContext } from "../providers/ProjectProvider";
import { TicketContext } from "../providers/TicketProvider";
import AppLoading from "expo-app-loading";

export default function TicketsScreen({
  navigation,
}: RootTabScreenProps<"Tickets">) {
  const { projectId } = useContext(ProjectContext);
  const { tickets, setTickets } = useContext(TicketContext);
  const scrollX = new Animated.Value(0);
  let screenWidth = Dimensions.get("window").width;

  const { error, data, loading } = useQuery<
    ProjectTicketsData,
    ProjectTicketsVariables
  >(API.query.GET_PROJECT_TICKETS, {
    variables: {
      projectId: Number(projectId),
    },
    pollInterval: 500,
  });

  useEffect(() => {
    if (data && data.getProjectTickets) {
      setTickets(data.getProjectTickets);
    }
  }, [data]);

  if (error) {
    throw new Error(error.message);
  }

  if (loading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.ScrollView
        style={styles.container}
        horizontal={true}
        snapToInterval={screenWidth}
        contentContainerStyle={{ flexGrow: 1 }}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        overScrollMode="never"
      >
        <TicketColumn
          title="À faire"
          tickets={tickets?.filter((e) => e.statusId === 1)}
          navigation={navigation}
        />
        <TicketColumn
          title="En cours"
          tickets={tickets?.filter((e) => e.statusId === 2)}
          navigation={navigation}
        />
        <TicketColumn
          title="Review"
          tickets={tickets?.filter((e) => e.statusId === 3)}
          navigation={navigation}
        />
        <TicketColumn
          title="Terminé"
          tickets={tickets?.filter((e) => e.statusId === 4)}
          navigation={navigation}
        />
      </Animated.ScrollView>
      <View style={styles.indicator}>
        <RNAnimatedScrollIndicators
          numberOfCards={4}
          scrollWidth={screenWidth}
          activeColor={color.light.darkPurple}
          inActiveColor={color.light.lightGrey}
          scrollAnimatedValue={scrollX}
        />
      </View>
    </SafeAreaView>
  );
}
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light.background,
  },
  indicator: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    marginBottom: 10,
    position: "absolute",
  },
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
});
