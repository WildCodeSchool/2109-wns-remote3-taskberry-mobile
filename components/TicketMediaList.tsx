import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../constants/API";
import { useQuery } from "@apollo/client";
import TicketMedia from "./TicketMedia";

export default function TicketMediaList({
  ticketId,
}: {
  ticketId: number | null;
}) {
  const [ticketMedia, setTicketMedia] = useState(null);
  const { data } = useQuery(API.query.GET_TICKET_MEDIA, {
    variables: {
      ticketId: Number(ticketId),
    },
    pollInterval: 500,
  });

  useEffect(() => {
    if (data) {
      const { getTicketMedia } = data;
      setTicketMedia(getTicketMedia);
    }
  }, [data]);

  const mediaItem = ({ item }: { item: Media }) => {
    return (
      <TicketMedia
        id={item.id}
        url={item.url}
        name={item.name}
        type={item.type}
      />
    );
  };

  return (
    <View style={{ display: "flex", flexDirection: "row", marginTop: 6 }}>
      {ticketMedia && (
        <FlatList
          ItemSeparatorComponent={() => <View style={{ marginRight: 6 }} />}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={ticketMedia}
          renderItem={mediaItem}
          keyExtractor={({ id }) => id.toString()}
        />
      )}
    </View>
  );
}
