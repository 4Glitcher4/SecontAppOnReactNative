import React from "react";
import { ReactElement } from "react";
import { Platform, StyleSheet, Text } from "react-native";

function Title(props: { children: string }): ReactElement {
  return <Text style={styles.title}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 0,
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});

export default Title;
