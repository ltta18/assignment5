import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  cardContainer: {
    marginLeft: 5, 
    marginRight: 5,
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  content: {
    marginBottom: 10
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  button: {
    marginTop: 20,
  }
});
