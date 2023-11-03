import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: COLORS.lightWhite
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    marginTop: 10,
    marginBottom: 15
  },
  userName: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  tabTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 2,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  }
});

export default styles;
