import { StyleSheet, Dimensions, Animated, SafeAreaView } from "react-native";
import { View } from "../components/Themed";
import TicketColumn from "../components/TicketColumn";
import color from "../constants/Colors";
// @ts-ignore
import RNAnimatedScrollIndicators from "react-native-animated-scroll-indicators";
import React from "react";

export default function TicketsScreen() {
  const scrollX = new Animated.Value(0);
  let screenWidth = Dimensions.get("window").width;

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
        <TicketColumn title="À faire" />
        <TicketColumn title="En cours" />
        <TicketColumn title="Review" />
        <TicketColumn title="Terminé" />
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
