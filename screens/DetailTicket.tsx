import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import image from "../constants/Images";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { TicketContext } from "../providers/TicketProvider";

const messages = [
  {
    id: 1,
    avatar: image.avatar_3,
    username: "John",
    date: "15h00 28/10/2021",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip",
  },
  {
    id: 2,
    avatar: image.avatar_1,
    username: "Anne",
    date: "15h10 28/10/2021",
    message: "Lorem Ipsum is simply dummy",
  },
  {
    id: 3,
    avatar: image.avatar_2,
    username: "Jane",
    date: "15h13 28/10/2021",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nostrum alias cum. Vero aspernatur rerum expedita at suscipit quas blanditiis dolorum vel molestiae.",
  },
  {
    id: 4,
    avatar: image.avatar_4,
    username: "Mark",
    date: "16h00 28/10/2021",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Incidunt nostrum alias cum. Vero aspernatur",
  },
];

const renderMessage = ({ item }: any): JSX.Element => {
  return (
    <View style={styles.bulleChat}>
      <Image
        source={item.avatar}
        resizeMode="contain"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <View>
        <Text style={{ fontSize: 10 }}>
          By {item.username}, {item.date}
        </Text>
        <Text style={{ textAlign: "left", width: 280 }}>{item.message}</Text>
      </View>
    </View>
  );
};

const DetailTicket = (): JSX.Element => {
  const { ticket, setTicket } = useContext(TicketContext);

  const [selectedValue, setSelectedValue] = useState(ticket?.statusId);
  const [asset1, setAsset1] = useState(null);
  const [asset2, setAsset2] = useState(null);
  const [asset, setAsset] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const pickFile = async (num: number): Promise<void> => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      if (asset === 1) {
        switch (num) {
          case 1:
            setAsset1(result);
            break;
          case 2:
            setAsset2(result);
            break;
          default:
            break;
        }
      } else if (asset === 2) {
        switch (num) {
          case 1:
            setAsset1(result);
            break;
          case 2:
            setAsset2(result);
            break;
          default:
            break;
        }
      }
    }
  };
  const pickImage = async (num: number): Promise<void> => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      if (asset === 1) {
        switch (num) {
          case 1:
            setAsset1(result);
            break;
          case 2:
            setAsset2(result);
            break;
          default:
            break;
        }
      } else if (asset === 2) {
        switch (num) {
          case 1:
            setAsset1(result);
            break;
          case 2:
            setAsset2(result);
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>{ticket?.name}</Text>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 30,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <Text>
          <AntDesign name="clockcircleo" size={20} color="black" />
          <Text style={styles.text}> Fin prévue: {ticket?.finishedAt}</Text>
        </Text>
        <Picker
          selectedValue={selectedValue?.toString()}
          style={{ height: 50, width: 130 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemIndex)}
        >
          <Picker.Item label="À faire" value="0" />
          <Picker.Item label="En cours" value="1" />
          <Picker.Item label="Review" value="2" />
          <Picker.Item label="Validé" value="3" />
        </Picker>
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{ticket?.description}</Text>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          marginTop: 30,
          width: "100%",
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setAsset(1);
          }}
        >
          <Text>
            <AntDesign name="download" size={24} color="black" />
            <Text style={styles.text}> Asset 1</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setAsset(2);
          }}
        >
          <Text>
            <AntDesign name="download" size={24} color="black" />
            <Text style={styles.text}> Asset 2</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => `${item.id}`}
          renderItem={renderMessage}
        />
        <View style={styles.chatTextInputContainer}>
          <TextInput multiline={true} style={styles.chatTextInput}></TextInput>
          <Pressable style={styles.button}>
            <Ionicons name="send" size={18} color="white" />
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButtonModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                pickImage(1);
                setModalVisible(!modalVisible);
              }}
            >
              <Text>
                <Ionicons name="camera" size={50} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                pickFile(2);
                setModalVisible(!modalVisible);
              }}
            >
              <Text>
                <AntDesign name="download" size={50} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailTicket;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: 30,
  },
  text: {
    fontSize: 15,
  },
  taskContainer: {
    backgroundColor: "#E8E8E8",
    width: "85%",
    minHeight: 100,
    borderRadius: 10,
    marginTop: 30,
  },
  taskText: {
    padding: 10,
  },
  chatContainer: {
    backgroundColor: "#E8E8E8",
    width: "90%",
    height: 330,
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
  },
  chatText: {
    padding: 10,
  },
  chatTextInputContainer: {
    backgroundColor: "white",
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
  },
  chatTextInput: {
    width: "83%",
    paddingRight: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4C16B6",
  },
  bulleChat: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconBack: {
    position: "absolute",
    left: 10,
    top: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButtonModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalButton: {
    marginRight: 30,
  },
});
