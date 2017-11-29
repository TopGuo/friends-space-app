import {
    AsyncStorage
} from 'react-native';

const findFriendURL = 'http://192.168.199.165:3000/api/findUser';
const getFriendURL = 'http://192.168.199.165:3000/api/getFollow';
const followFriendURL = 'http://192.168.199.165:3000/api/follow';


class FriendManager {

    followFriend(userId){   
        return new Promise(async(callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');
            const response = await fetch(followFriendURL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token,
                    userId
                })
            })

            const json = await response.json();

            console.log(json);

            if(json.success){
                callBack({
                    state:true,
                });
            } else {
                callBack({
                    state:false,
                    message:json.message,
                });
            }
        })
    }

    getFriend(){   
        return new Promise(async(callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');
            const response = await fetch(getFriendURL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token,
                })
            })

            const json = await response.json();

            console.log(json);

            if(json.success){
                callBack({
                    state:true,
                    data:json.data,
                });
            } else {
                callBack({
                    state:false,
                    message:json.message,
                });
            }
        })
    }

    findFriend(nickname){
        return new Promise(async(callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');
            const response = await fetch(findFriendURL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token,
                    nickname
                })
            });

            const json = await response.json();

            console.log(json);

            if(json.success){
                callBack({
                    state:true,
                    data:json.data,
                });
            } else {
                callBack({
                    state:false,
                    message:json.message,
                });
            }
        });
    }
}

export default new FriendManager();