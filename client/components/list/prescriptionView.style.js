import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 5,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    padding: 14,
    alignSelf: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  selected: {
    borderStyle: "solid",
    borderColor: COLORS.peach,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: "bold",
    paddingBottom: 5
  },
  rightSide: {
    display: "flex",
    flexDirection: "row",
    marginRight: 4,
    marginTop: 2
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  active: {
    backgroundColor: '#2ecc71', // Green color
  },
  paused: {
    backgroundColor: '#fff700', // Green color
  },
  button: {
    width: "100%",
    height: "100%",
  }
});

export default styles;
