import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
    padding: 15,
    alignSelf: "center",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1
  },
  checkBoxContainer: {
    alignSelf:"center"
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  checkbox: {
    margin: 8
  }
});

export default styles;
