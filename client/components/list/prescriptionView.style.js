import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 5,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    padding: 12,
    alignSelf: "center",
    borderRadius: 12,
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
    backgroundColor: '#2ecc71', // Green color
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: 'blue',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
  }
});

export default styles;
