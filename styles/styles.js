import { StyleSheet } from 'react-native';

export const articleStyles = StyleSheet.create({
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
  navigator: {
    backgroundColor: 'lightblue'
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

export const publisherStyles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  publisher: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  publisherName: {
    width: '50%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  publisherArticles: {
    width: '50%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  }
});
