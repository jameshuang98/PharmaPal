import { StyleSheet } from 'react-native';

import { FONT, SIZES, COLORS } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 15
  },
  tabTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  // section: {
  //   backgroundColor: lightThemeColor,
  //   color: 'grey',
  //   textTransform: 'capitalize'
  // }
});

export default styles;
