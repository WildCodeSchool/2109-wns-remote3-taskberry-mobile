import { Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React, { SetStateAction, useState } from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "./Themed";
import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import { useMutation } from "@apollo/client";
import API from "../constants/API";

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

interface TicketMediaProps {
  id: number;
  url: string;
  name: string;
  type: string;
}

export default function TicketMedia({ id, name, type, url }: TicketMediaProps) {
  const [mediaDeleteBtnVisible, setMediaDeleteBtnVisible] =
    useState<SetStateAction<boolean>>(false);
  const [deleteMedia] = useMutation(API.mutation.DELETE_MEDIA);
  const iconSize = 18;

  const getFileIcon = () => {
    switch (type) {
      case "image/jpeg":
        return "image";
      case "image/png":
        return "image";
      case "video/mp4":
        return "videocam";
      default:
        return "md-attach";
    }
  };

  const deleteFile = async (id: number, url: string) => {
    try {
      deleteMedia({
        variables: {
          mediaId: Number(id),
        },
      });

      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ display: "flex" }}>
      <TouchableOpacity
        style={style.assetContainer}
        onPress={() => Linking.openURL(url)}
        onLongPress={() => setMediaDeleteBtnVisible(true)}
      >
        <Ionicons
          name={getFileIcon()}
          size={iconSize}
          color="black"
          style={{ marginRight: 4 }}
        />
        <Text>{name}</Text>
      </TouchableOpacity>

      {mediaDeleteBtnVisible && (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => deleteFile(id, url)}
        >
          <Text style={{ color: Colors.light.red, fontSize: 12 }}>
            Supprimer
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  assetContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: Colors.light.lightGrey,
    height: 40,
  },
});
