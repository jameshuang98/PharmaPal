import { StyleSheet } from 'react-native';

import { FONT, SIZES, COLORS } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  titleContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15
  },
  tabTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 2,
  }
});

export default styles;
