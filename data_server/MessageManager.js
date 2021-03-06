import {
    AsyncStorage
} from 'react-native';

const postMessageURL = 'http://60.205.141.116:9010/api/postAppMessage';
const homeMessageURL = 'http://60.205.141.116:9010/api/homeMessage';

class MessageManager {

    constructor(){
        this.messages = [];
    }

    setMessageManagerListener(listener){
        this.listener = listener;
    }


    getHomeMessages(){
        return new Promise(async(callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');
            const response = await fetch(homeMessageURL,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_token
                })
            });
            const json = await response.json();

            console.log(json);

            if(json.success){

                this.messages = json.data;
                this.listener({
                    state:true,
                    data:json.data,
                });

                callBack();
            } else {
                this.listener({
                    state:false,
                    message:json.message,
                });
                callBack();
            }
        })
    }

    postMessage(message){
        return new Promise(async(callBack,reject)=>{
            const access_token = await AsyncStorage.getItem('access_token');
            const formData = new FormData();
            formData.append('access_token',access_token);
            formData.append('content',message.content);
            message.images.map((image,index)=>{
                formData.append(`image${index}`,{
                    uri:image.url,
                    name:`image${index}.png`,
                    type:'image/png'
                });
            });
            const response = await fetch(postMessageURL,{
                method:'POST',
                "Content-Type":"multipart/form-data",
                body: formData,
            })
            const json = await response.json();

            //console.log(json);
            
            if(json.success){
                this.messages = [json.data,...this.messages];
                this.listener({
                    state:true,
                    data:this.messages,
                });
            }

            callBack({
                state:json.success,
                message:json.message
            })

        })
    }
}

export default new MessageManager();