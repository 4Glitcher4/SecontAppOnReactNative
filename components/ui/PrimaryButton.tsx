import React from "react";
import { ReactElement } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../util/colors";

interface PropsPrimaryButton {
  children: string | ReactElement<any, string>;
  onPress: () => void;
}

function PrimaryButton({
  children,
  onPress,
}: PropsPrimaryButton): ReactElement {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }: PressableStateCallbackType) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.25,
  },
});

export default PrimaryButton;
