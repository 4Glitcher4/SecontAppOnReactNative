import React, { ReactElement } from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../util/colors";

function InstructionText(props: {
  children: string;
  style?: {}
}): ReactElement {
  return <Text style={[styles.instructionText, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default InstructionText;
