import { StyleSheet } from "react-native";

import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.tertiary,
    padding: 10,
  },
  timeslot: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.lightWhite,
    marginTop: 2,
  },
});

export default styles;
