import React from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList, SectionList} from 'react-native';

export default class Message extends React.Component{
 
    state = {
        messages : []
    }

    componentDidMount = () =>{
        const messages = this.props
        console.log('entrou aqui')
        this.setState({
            messages
        });

    }

    renderItems = ({item}) => {
        return (
            <View>
                {item.question  && <Text style={styles.messageQuestion}>{item.question}</Text>}
                {item.answer && <Text style={styles.messageAnswer}>{item.answer}</Text> }
            </View>
        )        
    }

    render(){

       const {messages} = this.state
       {console.log('Mensagens dentro do render', messages)}
    
        return(
            <View style={styles.container}>
                <FlatList 
                    data={messages.messages} 
                    renderItem={this.renderItems}
                    extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width / 100 * 90,
        alignSelf : 'center',
        maxHeight : Dimensions.get('window').height / 100 * 80,
    },
    messageQuestion : {
        backgroundColor : '#00B0E6',
        maxWidth : Dimensions.get('window').width / 2,
        alignSelf : 'flex-end',
        padding : 10,
        borderRadius : 20,
        marginVertical : 5
    },
    messageAnswer : {
        backgroundColor : '#e5e5ea',
        alignSelf : 'flex-start',
        padding : 10,
        borderRadius : 20,
        marginVertical : 5
    }
})