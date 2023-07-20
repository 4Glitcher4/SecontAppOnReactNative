import React, { ReactElement } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../util/colors";

function NumberContainer(props: { children: number }): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{props.children}</Text>
    </View>
  );
}

const diviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: diviceWidth < 380 ? 12 : 24,
    margin: diviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: diviceWidth < 380 ? 28 : 36,
    fontFamily: "open-sans-bold",
    // fontWeight: "bold",
  },
});

export default NumberContainer;
