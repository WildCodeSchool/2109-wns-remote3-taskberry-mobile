import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import NotificationsCard from "../components/NotificationsCard";

export default function Notifications() {
  const textNotif =
    "@ John Doe vous a assigné sur le ticket #123 “Modifier la couleur du bouton Envoyer”";
  const dateNotif = "17h01 28/12/2022";
  return (
    <View style={styles.container}>
      <NotificationsCard text={textNotif} date={dateNotif} />
      <NotificationsCard text={textNotif} date={dateNotif} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
