import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ProjectProvider } from "./providers/ProjectProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import { TicketProvider } from "./providers/TicketProvider";
const { manifest } = Constants;
import "intl";
import "intl/locale-data/jsonp/fr";
import { LogBox } from "react-native";
import React from "react";
LogBox.ignoreLogs(["Setting a timer"]);

const token = "";
let uri;
const url1 = `http://${manifest?.debuggerHost?.split(":").shift()}:4000`;
const url2 = `http://192.168.0.17:4000`;
const isEmulator = false;

export const client = new ApolloClient({
  uri: isEmulator ? url2 : url1,
  // headers: {
  //   authorization: token ? `Bearer ${token}` : ''
  // },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <TicketProvider>
          <ProjectProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </ProjectProvider>
        </TicketProvider>
      </ApolloProvider>
    );
  }
}
