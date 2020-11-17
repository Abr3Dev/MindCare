import React from 'react';
import { StyleSheet, Text, View, Dimensions,KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Message from '../message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleRight as send } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/index'


export default class MainScreen extends React.Component{

    state = {
        messages : [
           {
            question : '',
           },
           {
            answer : '',
           }
        ],    
        question : ''    
    }

    componentDidMount = () =>{
        this.setState({
            messages : [
                {
                    question : 'Olá tudo bem ?',
                    idQuestion : 1,
                },
                {
                    answer : 'Tudo ótimo',
                    idQuestion : 1,
                    id : 1,
                },
            ]  
        })
    }

    addConversation = () =>{
        const {messages} = this.state
        api.get(`/Questions?question=${this.state.question}`)
        .then(resp => {
            messages.push({
                question : resp.data[0].question,
            })
            this.setState({
                
                messages : messages
            })
            api.get(`/answers?idQuestion=${resp.data[0].id}`)
            .then(resp =>{
               messages.push({
                    answer : resp.data[0].answer,
                                   })
               this.setState({
                   messages : messages,
                                  })
            })
        })
        .catch(error => {
            messages.push({
                question : this.state.question,
                answer : 'Desculpe não entendi sua pergunta',
            })
            this.setState({
                messages : messages,
                            })
        })
    }

    handleChangeInput = (value) =>{
        this.setState({
            question : value 
        })
    }
    
    render(){

        const {messages} = this.state

        return(
            <ScrollView style={styles.container}>
               <View style={styles.inputMessages}>
                    <ScrollView style={styles.messages}>
                        <Message messages={messages}/>
                    </ScrollView>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.keyboard} onChangeText={value => {this.handleChangeInput(value)}} value={this.state.question}/>
                        <TouchableOpacity onPress={this.addConversation}>
                        <FontAwesomeIcon
                            icon={send}
                            size={46}
                            color={'#00B0E6'}
                        />
                        </TouchableOpacity>
                    </View>
               </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#CCCFCF',
    },

    inputMessages : {
        width : Dimensions.get('window').width / 100 * 90,
        alignSelf : 'center',
        justifyContent : 'center',
        height : Dimensions.get('window').height / 100 * 96,
    },
    messages : {
        paddingVertical: 15,
    },
    keyboard : {
        width : 240,
        borderRadius : 15,
        backgroundColor : 'white',
    },
    containerInput : {
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        position : 'absolute',
        bottom : 15,
        width : Dimensions.get('window').width / 100 * 90
        
    },
})