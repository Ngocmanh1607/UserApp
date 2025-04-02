import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  headerContainer: {},
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  noOrdersText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  searchbox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    alignSelf: 'center',
    elevation: 3,
    borderRadius: 10,
    height: 45,
    marginBottom: 10,
  },
  input: {
    width: '90%',
    fontSize: 16,
    color: 'black',
  },
});
export default styles;
