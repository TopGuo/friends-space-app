import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { 
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';

import { 
  Toast
} from 'antd-mobile';


import PubSub from 'pubsub-js';

import AdScreen from './screen/AdScreen';
import LoginScreen  from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import CreateUserScreen from './screen/CreateUserScreen';
import HomeScreen from './screen/HomeScreen';
import PostMessageScreen from './screen/PostMessageScreen';
import FriendScreen from './screen/FriendScreen';
import MySelfScreen from './screen/MySelfScreen';
import FindFriendScreen from './screen/FindFriendScreen';
import UpdateMySelfScreen from './screen/UpdateMySelfScreen';
import ChangePasswordScreen from './screen/ChangePasswordScreen';

import accountManager from './data_server/AccountManager';

//accountManager.logout();

// PubSub.subscribe( 'Toast',(msg,data)=>{
//   switch(data.type){
//     case 'fail':{

//     };break;
//     case 'loading':{
      
//     };break;
//     case 'fail':{

//     };break;
//     case 'fail':{
      
//     };break;

//   }
// });

const RootTabNavigator = TabNavigator({
  HomeScreen:{screen:HomeScreen},
  FriendScreen:{screen:FriendScreen},
  MySelfScreen:{screen:MySelfScreen},
},{
  tabBarComponent:TabBarBottom,
  tabBarPosition:'bottom',
  swipeEnabled:false,
  animationEnabled:true
})

const RootNavigator = StackNavigator({
  AdScreen:{screen:AdScreen},
  LoginScreen:{screen:LoginScreen},
  RegisterScreen:{screen:RegisterScreen},
  CreateUserScreen:{screen:CreateUserScreen},
  RootTabNavigator:{screen:RootTabNavigator},
  PostMessageScreen:{screen:PostMessageScreen},
  FindFriendScreen:{screen:FindFriendScreen},
  UpdateMySelfScreen:{screen:UpdateMySelfScreen},
  ChangePasswordScreen:{screen:ChangePasswordScreen},
},{
  headerMode:'screen',
})

export default RootNavigator;

