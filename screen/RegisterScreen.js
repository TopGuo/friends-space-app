import React, { Component } from 'react';

import { 
    Text, 
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native'

import { 
    Button,
    Flex,
    Toast,
} from 'antd-mobile';

import accountManager from '../data_server/AccountManager';

export default class RegisterScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title:'注册',
    });

    constructor(props) {
        super(props)
      
        this.state = {
           email:'',
           password:''
        }
      }

    render() {
        return (
        <View style={styles.container}>
            <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="输入登录邮箱"
                    onChangeText={(email) => this.setState({email})}
                />
            <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder="输入密码"
                onChangeText={(password) => this.setState({password})}
            />
            <Button 
                style={styles.button} 
                type='primary'
                onClick={async ()=>{
                    Toast.loading('注册中');
                    const result = await accountManager.register(this.state.email,this.state.password);
                    console.log(result);
                    Toast.hide();
                    if(result.state){
                        //跳转UserCreate
                        this.props.navigation.navigate('CreateUserScreen');
                    } else {
                        Toast.fail('用户名重复，请更换', 1);
                    }
                }}
            >提交注册</Button>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#ffffff',
    },
    textInput:{
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        height: 44,
        width:Dimensions.get('window').width-20,
        margin:10,
    },
    button:{
        height: 44,
        width:Dimensions.get('window').width-20,
        margin:10,
        padding: 0
    }
})