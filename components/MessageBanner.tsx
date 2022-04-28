import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export interface MessageBannerProps {
  color?: string;
  text: string;
  textColor?: string;
  success?: boolean;
  error?: boolean;
  dismissable?: boolean;
  onDismissPress?: any;
}

export default function MessageBanner({
  color,
  text,
  success,
  error,
  dismissable,
  onDismissPress,
}: MessageBannerProps) {
  const getBackgroundColor = () => {
    if (success) {
      return Colors.light.green;
    } else if (error) {
      return Colors.light.red;
    } else if (color) {
      return color;
    }
  };

  const getTextColor = () => {
    if (success || error) {
      return Colors.light.background;
    } else {
      return Colors.light.text;
    }
  };

  const bannerContainerStyle = {
    ...style.bannerContainer,
    backgroundColor: getBackgroundColor(),
  };

  const textStyle = {
    ...style.text,
    color: getTextColor(),
  };

  const closeTextStyle = {
    ...style.text,
    color: getTextColor(),
    fontSize: 12,
  };

  return (
    <View style={bannerContainerStyle}>
      <Text style={textStyle}>{text}</Text>

      {dismissable && onDismissPress && (
        <TouchableOpacity style={style.close} onPress={() => onDismissPress()}>
          <Text style={closeTextStyle}>Fermer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  bannerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  close: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
});
