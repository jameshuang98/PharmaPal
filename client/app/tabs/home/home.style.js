import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20
  },
  userName: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  }
});

export default styles;
