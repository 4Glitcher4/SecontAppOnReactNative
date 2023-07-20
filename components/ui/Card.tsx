import React, { ReactElement } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../util/colors";

function Card(props: { children: ReactElement<any, string>[] }): ReactElement {
  return <View style={styles.card}>{props.children}</View>;
}

const diviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: diviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
  },
});
export default Card;
