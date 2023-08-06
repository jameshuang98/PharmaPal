import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  slot: {
    width: "100%",
    marginBottom: 5,
    backgroundColor: COLORS.secondary,
    padding: 4,
  },
  time: {
    fontSize: SIZES.medium + 2,
    fontWeight: "bold",
    color: COLORS.lightWhite,
    marginTop: 2,
    fontFamily: "Arial"
  },
});

export default styles;
