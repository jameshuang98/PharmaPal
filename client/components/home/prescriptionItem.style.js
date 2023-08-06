import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginTop: 5,
    marginBottom: 2,
    backgroundColor: COLORS.white,
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
    fontWeight: "bold"
  },
  checkbox: {
    margin: 8
  }
});

export default styles;
