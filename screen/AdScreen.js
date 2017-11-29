import React, { Component } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

import accountManager from '../data_server/AccountManager';



export default class AdScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:null,
    });

    constructor(props) {
      super(props)
    
      this.state = {
         n:1,
         screen:'LoginScreen'
      }
    }
    

    componentDidMount(){

        accountManager.isLogin()
        .then((result)=>{
            if(result){
                this.setState({screen:'HomeScreen'});
            }
        });

        const timer = setInterval(()=>{
            const n = this.state.n;
            this.setState({
                n:this.state.n-1,
            })
            if(n === 1){
                clearInterval(timer);
                this.props.navigation.navigate(this.state.screen);
            }
            
        },2000);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text}> AdScreen </Text>
            <Text> {this.state.n} </Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        marginTop:100,
    }
})