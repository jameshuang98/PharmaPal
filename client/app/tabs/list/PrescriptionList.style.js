import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15
  },
  tabTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 2,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
  fab: {
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    position: 'absolute',
    borderRadius: 30,
    margin: 16,
    right: 0,
    bottom: 0
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%"
  },
  modalView: {
    width: "90%",
    height: "80%",
    marginBottom: 30,
    marginTop: 45,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 0
  },
  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  textInput2: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },
  outsideModal: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    alignItems:"center"
  }
});

export default styles;