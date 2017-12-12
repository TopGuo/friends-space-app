import React, { Component } from 'react'
import { 
    Text, 
    View,
    Button,
    Image,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native'

import { 
    Toast,
    Card
} from 'antd-mobile';


import PubSub from 'pubsub-js';

import FriendItem from '../view_component/FriendItem';

import friendMessage from '../data_server/FriendManager';

export default class FriendScreen extends Component {
  
    static navigationOptions = ({ navigation }) => ({
        title:'好友',
        headerLeft:null,
        headerRight:(
            <Button
                title="加好友"
                onPress={()=>{
                    PubSub.publish('add-friend');
                }}
            />
        ),
        tabBarIcon: ({ focused }) => (
            <Image
              source={focused?require('../images/icon3.png'):require('../images/icon2.png')}
              style={{width:28,height:28}}
            />
        )
    });

    constructor(props) {
      super(props)
    
      this.state = {
         friends:[],
         refreshing:false,
      }
    }
    

    loadFriends(){
        friendMessage.getFriend()
        .then((result)=>{
            Toast.hide();
            this.setState({refreshing:false});
            if (result.state == true ) {
                this.setState({friends:result.data});
            } else {
                Toast.fail(result.message,2);
            }
        })
    }

    componentDidMount(){

        console.log('aaa');
        PubSub.subscribe( 'add-friend',()=>{
            this.props.navigation.navigate('FindFriendScreen');
        });

        Toast.loading('加载中', 0)
        this.loadFriends();

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.friends}
                    refreshing={this.state.refreshing}
                    onRefresh={async()=>{
                        this.setState({refreshing:true});
                        this.loadFriends();          
                    }}
                    renderItem={({item,index})=>{
                        return (
                            <FriendItem 
                                {...item} 
                            />
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


  