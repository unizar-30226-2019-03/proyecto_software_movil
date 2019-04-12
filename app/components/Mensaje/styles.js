import {Dimensions,StyleSheet} from "react-native";
const {width, height} = Dimensions.get('window');
const anchuraMensaje = width*0.45;

import {GrisChat} from "../../constants";

export default StyleSheet.create({
    entrante:{
        backgroundColor:GrisChat,
        alignSelf: 'flex-start',
        
        borderRadius:height*0.02,
        maxWidth:anchuraMensaje,
        marginLeft:width*0.02,
        marginTop:height*0.010
        
        
    },
    saliente:{
        backgroundColor:GrisChat,
        alignSelf: 'flex-end',
        
        borderRadius:height*0.02,
        maxWidth:anchuraMensaje,
        marginRight:width*0.02,
        marginTop:height*0.010
    },
    texto:{
        margin:anchuraMensaje*0.05,
        fontSize:anchuraMensaje*0.1
        
    }
}
);