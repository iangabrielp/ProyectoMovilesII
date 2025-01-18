import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Diseños generales
  contenedorAll:{
    flex:1,
    padding:20,
  },
  //Diseños del Registro
  h1LogReg:{
    color:'white',
    fontSize:36,
    fontWeight:'700',
    textAlign:'center',
    marginTop:0,
    marginBottom:10
  },
  h1btn:{
    color:'white',
    fontSize:24,
    fontWeight:'600',
    textAlign:'center',
  },
  input: {
    height: 68,
    color:'white',
    fontSize:30,
    borderColor: 'white',
    marginBottom: 10,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor:'#a92d45'
  },
  btnRegLog:{
    width:'40%',
    backgroundColor:'#8E1149',
    borderRadius:16,
    padding:10,
    marginTop:5
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius:100,
    alignSelf:'center',
    borderWidth:4,
    borderColor:'white',
    marginBottom:10
  },
})