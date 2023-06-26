import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  userName: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
});

export default styles;
