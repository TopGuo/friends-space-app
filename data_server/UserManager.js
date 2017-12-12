import {
    AsyncStorage
} from 'react-native';

const createUserURL = 'http://60.205.141.116:9010/api/createUser';
const getUserURL = 'http://60.205.141.116:9010/api/getUser';
const updateUserURL = 'http://60.205.141.116:9010/api/updateUser';

class UserManager{

    setListener(listener){
        this.listener = listener;
    }

    createUser(user){
        return new Promise(async (callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');

            const formData = new FormData();
            formData.append('access_token',access_token);
            formData.append('nickname',user.nickname);
            formData.append('sign',user.sign);
            formData.append('image',{
                uri:user.image,
                name:'image.png',
                type:'image/png'
            });

            const response = await fetch(createUserURL,{
                method:'POST',
                "Content-Type":"multipart/form-data",
                body: formData,
            })

            const json = await response.json();

            console.log(json);

            if(json.success){
                await this.saveUserInfo(json.data);

                callBack({
                    state:true
                });
            } else {
                callBack({
                    state:false,
                    message:json.message
                });
            } 
        })
    }

    saveUserInfo(user){
        this.user = user;
        return AsyncStorage.setItem('user',JSON.stringify(user));
    }

    getUser(userId = 0){
        return new Promise(async(callBack,reject)=>{

            if(this.user){
                if(this.listener){
                    this.listener({
                        state:true,
                        user:this.user
                    })
                }
                return callBack({
                    state:true,
                    user:this.user
                });
            }

            const userJSON = await AsyncStorage.getItem('user');
            const user = JSON.parse(userJSON);
            if(user){
                this.user = user;
                if(this.listener){
                    this.listener({
                        state:true,
                        user:this.user
                    })
                }
                return callBack({
                    state:true,
                    user:this.user
                });
            }          

            const access_token = await AsyncStorage.getItem('access_token');
            const response = await fetch(getUserURL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token,
                    userId,
                })
            })
            const json = await response.json();
            if(json.success){
                await this.saveUserInfo(json.data);
                if(this.listener){
                    this.listener({
                        state:true,
                        user:this.user
                    })
                }
                callBack({
                    state:true,
                    user:json.data
                });
            } else {
                if(this.listener){
                    this.listener({
                        state:false,
                        user:json.message
                    });
                }
                callBack({
                    state:false,
                    message:json.message,     
                });
            } 

        })
        
    }

    updateUser(user){
        return new Promise(async (callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');

            const formData = new FormData();
            formData.append('access_token',access_token);
            formData.append('nickname',user.nickname);
            formData.append('sign',user.sign);

            if(user.image){
                formData.append('image',{
                    uri:user.image,
                    name:'image.png',
                    type:'image/png'
                });
            }  

            const response = await fetch(updateUserURL,{
                method:'POST',
                "Content-Type":"multipart/form-data",
                body: formData,
            })

            const json = await response.json();

            console.log(json);

            if(json.success){
                await this.saveUserInfo(json.data);

                this.listener({
                    state:true,
                    user:this.user
                })
                
                callBack({
                    state:true
                });
            } else {



                callBack({
                    state:false,
                    message:json.message
                });
            } 
        })
    }

}

export default new UserManager();


