import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    borderRadius:25,
    backgroundColor: '#A2C8F4',
    width:30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
    color: '#003366', 

    marginRight: 10,
    padding:10,
    flex: 1,
  },
  uncompletedTask: {
    flex: 3,
  },
  statusText: {
    flex: 2,
    textAlign: 'center',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
    flex:3,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});

export default styles;
