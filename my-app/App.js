import React from 'react';
import RNShake from 'react-native-shake';
import { FlatList, ActivityIndicator, Text, View, Image  } from 'react-native';
import { ShakeEventExpo } from './ShakeEventExpo';

const soundObject = new Expo.Audio.Sound();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
}



    componentWillMount() {
        ShakeEventExpo.addListener(() => {
             soundObject.loadAsync(require('./0926.mp3'));
             soundObject.playAsync();
             soundObject.setProgressUpdateIntervalAsync();
            return fetch('https://api.thecatapi.com/v1/images/search')
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        isLoading: false,
                        url: responseJson[0].url,
                    }, function(){
                    });

                })
                .catch((error) =>{
                    console.error(error);
                });    // Your code...
        });
    }

    componentWillUnmount() {
        ShakeEventExpo.removeListener();
    }





    render(){

        return(
            <View>
                <Text style={{marginTop: 50 ,height : 150, width: 300}} > Shake your phone </Text>
                <Image
                    style={{marginTop: 50 ,height : 150, width: 300}}
                    source={{ uri : this.state.url}}
                />
            </View>
        );
    }
}