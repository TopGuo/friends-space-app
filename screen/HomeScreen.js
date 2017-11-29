import React, { Component } from 'react'
import { 
    Text, 
    View,
    Image,
    Button,
    TextInput,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';

import { 
    Flex,
    Toast,
    ImagePicker,
} from 'antd-mobile';

import HomeMessageItem from '../view_component/HomeMessageItem';

import PubSub from 'pubsub-js';

import messageManager from '../data_server/MessageManager';

export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title:'朋友圈',
        headerLeft:null,
        headerRight:(
            <Button
                title="发消息"
                onPress={()=>{
                    PubSub.publish('send-message');
                }}
            />
        ),
        tabBarIcon: ({ focused }) => (
            <Image
              source={focused?require('../images/icon1.png'):require('../images/icon.png')}
              style={{width:28,height:28}}
            />
        )
    });

    constructor(props) {
      super(props)
    
      this.state = {
         messages:[],
         refreshing:false,
         isLoadingMore:false,
      }
    }
    

    componentDidMount(){
        PubSub.subscribe( 'send-message',()=>{
            this.props.navigation.navigate('PostMessageScreen');
        });
        Toast.loading('加载中', 0);
        messageManager.setMessageManagerListener((result)=>{  
            if(result.state){
                this.setState({messages:result.data});
            } else {
                Toast.fail(result.message,1);
            }
        })

        messageManager.getHomeMessages()
        .then(()=>{
            Toast.hide();
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    refreshing={this.state.refreshing}
                    onRefresh={async()=>{
                        this.setState({refreshing:true});
                        await messageManager.getHomeMessages(); 
                        this.setState({refreshing:false});     
                    }}
                    renderItem={({item,index})=>{
                        return (
                            <HomeMessageItem {...item} />
                        );
                    }}
                    keyExtractor={(message,index)=>{
                        return message.id;
                    }}
                />
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
  })