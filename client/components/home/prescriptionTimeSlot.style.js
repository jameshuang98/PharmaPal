import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 8,
    paddingBottom: 16,
    backgroundColor: COLORS.pastel,
    borderRadius: 16
  },
  slot: {
    width: "100%",
    marginBottom: 5,
    padding: 4,
  },
  time: {
    fontSize: SIZES.medium + 2,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 4,
    marginLeft: 6,
    fontFamily: "Arial"
  },
});

export default styles;
