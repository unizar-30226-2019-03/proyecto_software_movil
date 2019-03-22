import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  DownMenu: {
    backgroundColor: '#fff',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderColor: '#bbb'
  },
  DownMenuItems: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5
  },
  DownMenuTitle: {
    fontSize: 11,
    color: '#333',
    paddingTop: 4,
  }
});