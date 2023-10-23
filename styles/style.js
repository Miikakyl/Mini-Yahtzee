import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#05593E',
    marginBottom: 10
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    marginBottom: 5
  },
  scoreboardHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#E2D9C9"
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#E2D9C9"
  },
  totalText: {
    color: "#E2D9C9",
    fontSize: 22,
    margin: 10
  },
  input: {
    marginTop: 5,
    padding: 20
  },
  header: {
    marginBottom: 15,
    backgroundColor: '#05593E',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#05593E',
    flexDirection: 'row'
  },
  title: {
    color: '#967D04',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#967D04',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noScoresText: {
    color: "#E2D9C9",
    marginTop: 20,
    fontSize: 25
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#fff",
    fontSize: 20
  }
})