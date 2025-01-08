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
    marginTop:20,
    marginBottom:40
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
  }
})