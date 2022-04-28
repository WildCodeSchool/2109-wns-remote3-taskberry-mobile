import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import image from "../constants/Images";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useMutation, useQuery } from "@apollo/client";
import { TicketContext } from "../providers/TicketProvider";
import API from "../constants/API";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import MessageBanner, { MessageBannerProps } from "../components/MessageBanner";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import TicketMediaList from "../components/TicketMediaList";
import { DateTime } from "luxon";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const RenderMessage = ({ props }: any): JSX.Element => {
  return (
    <View style={styles.bulleChat}>
      <Image
        source={{
          uri: props?.User.profilePicture
            ? props?.User.profilePicture
            : image.avatar_4,
        }}
        resizeMode="contain"
        style={{ width: 35, height: 35, borderRadius: 100 }}
      />
      <View style={styles.messageContainer}>
        <Text style={styles.textInfoBulle}>
          par {props?.User.firstName},{" "}
          {DateTime.fromISO(props.createdAt)
            .setLocale("fr")
            .toLocaleString(DateTime.DATETIME_SHORT)}
        </Text>
        <Text style={styles.messageBulle}>{props.description}</Text>
      </View>
    </View>
  );
};

const DetailTicket = (): JSX.Element => {
  const { ticket } = useContext(TicketContext);
  const [selectedValue, setSelectedValue] = useState(ticket?.statusId);
  const [fileToUpload, setFileToUpload] = useState<
    ImagePicker.ImageInfo | DocumentPicker.DocumentResult | null
  >(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [messageBannerVisible, setMessageBannerVisible] = useState<
    MessageBannerProps & { visible: boolean }
  >({
    visible: false,
    text: "",
  });
  const [updateTicket] = useMutation(
    API.mutation.UPDATE_TICKET
  );
  const [createMedia] = useMutation(
    API.mutation.CREATE_MEDIA
  );
  const [addComment] = useMutation(
    API.mutation.CREATE_COMMENT
  );
  const [message, setMessage] = useState<string>("");
  const { data, loading, error } = useQuery<
    CommentsTicketData,
    CommentsTicketVariables
  >(API.query.GET_TICKET_COMMENTS, {
    variables: {
      ticketId: Number(ticket?.id),
    },
  });

  useEffect(() => {
    if (fileToUpload) {
      setModalVisible(false);
      uploadFile(fileToUpload);
    }
  }, [fileToUpload]);

  const selectFile = async (mode: string): Promise<void> => {
    if (mode === "camera") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setFileToUpload(result);
      }
    } else if (mode === "storage") {
      let result = await DocumentPicker.getDocumentAsync();

      if (result.type !== "cancel") {
        setFileToUpload(result);
      }
    }
  };

  const uploadFile = async (file: any) => {
    setMessageBannerVisible({
      visible: true,
      text: "Chargement...",
      color: "#dadada",
    });
    const blob: ArrayBuffer = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", file.uri, true);
      xhr.send(null);
    });

    const ext = file.uri.split(".")[3];
    const folder = `/tickets/${ticket?.id}`;

    const path = `${folder}/${file.name}`;
    const fileRef = ref(storage, path);

    try {
      const { metadata } = await uploadBytes(fileRef, blob);
      const storedURL = `https://storage.googleapis.com/${metadata.bucket}/${metadata.fullPath}`;

      createMedia({
        variables: {
          mediaInput: {
            name: file.name,
            type: file.mimeType,
            ticketId: Number(ticket?.id),
            createdAt: metadata.timeCreated,
            url: storedURL,
          },
        },
      });

      setFileToUpload(null);
      setMessageBannerVisible({
        visible: true,
        text: "Fichier envoyé",
        success: true,
        dismissable: true,
        onDismissPress: () =>
          setMessageBannerVisible({ visible: false, text: "" }),
      });
    } catch (e) {
      console.error(e);
      setMessageBannerVisible({
        visible: true,
        text: "Fichier trop volumineux (5Mo max.)",
        error: true,
        dismissable: true,
        onDismissPress: () =>
          setMessageBannerVisible({ visible: false, text: "" }),
      });
    }
  };

  const onChangeStatus = (status: number): void => {
    updateTicket({
      variables: {
        partialInput: {
          id: Number(ticket?.id),
          statusId: status,
        },
      },
    });
    setSelectedValue(status);
  };

  const handlePressMessage = (): void => {
    addComment({
      variables: {
        commentInput: {
          description: message,
          createdAt: new Date(),
          ticketId: Number(ticket?.id),
          userId: Number(1),
        },
      },
      refetchQueries: [
        {
          query: API.query.GET_TICKET_COMMENTS,
          variables: { ticketId: Number(ticket?.id) },
        },
      ],
      awaitRefetchQueries: true,
    })
      .then(() => {
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {messageBannerVisible.visible && (
        <MessageBanner
          text={messageBannerVisible.text}
          success={messageBannerVisible.success}
          error={messageBannerVisible.error}
          dismissable={messageBannerVisible.dismissable}
          onDismissPress={messageBannerVisible.onDismissPress}
        />
      )}

      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
        }}
      >
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
            onValueChange={(itemValue, itemIndex) =>
              onChangeStatus(Number(itemValue))
            }
          >
            <Picker.Item label="À faire" value="1" />
            <Picker.Item label="En cours" value="2" />
            <Picker.Item label="Review" value="3" />
            <Picker.Item label="Validé" value="4" />
          </Picker>
        </View>
        <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{ticket?.description}</Text>
        </View>

        {ticket?.id && <TicketMediaList ticketId={ticket.id} />}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Entypo
            name="attachment"
            size={22}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.text}>Ajouter un fichier</Text>
        </TouchableOpacity>

        <View style={styles.chatContainer}>
          <ScrollView>
            {data?.getTicketComments?.map((comment, index) => (
              <RenderMessage props={comment} key={comment.id} />
            ))}
          </ScrollView>
          <View style={styles.chatTextInputContainer}>
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              multiline={true}
              style={styles.chatTextInput}
            ></TextInput>
            <Pressable style={styles.button} onPress={handlePressMessage}>
              <Ionicons name="send" size={18} color="white" />
            </Pressable>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
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
                onPress={() => selectFile("camera")}
              >
                <Text>
                  <Ionicons name="camera" size={50} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectFile("storage")}
              >
                <Text>
                  <AntDesign name="download" size={50} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
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
    width: "90%",
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
  textInfoBulle: {
    fontSize: 10,
  },
  messageBulle: {
    textAlign: "left",
    width: 280,
  },
  messageContainer: {
    marginLeft: 5,
  },
});
