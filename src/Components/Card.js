import React, {Component} from 'react';
import {TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { deleteNotes} from '../Public/redux/action/notes';

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            createdAt   : new Date(this.props.data.created_at),
            monthList   : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            cardColor   : this.props.data.category_id == '1' ? '#66CCCC' : this.props.data.category_id == '2' ? '#36465D' : this.props.data.category_id == '3' ? '#00A68C' : this.props.data.category_id == '4' ? '#660033' : this.props.data.category_id == '5' ? '#666699' : this.props.data.category_id == '6' ? '#33CCCC' : this.props.data.category_id == '7' ? '#999966' : this.props.data.category_id == '8' ? '#996633' : this.props.data.category_id == '9' ? '#336633' : this.props.data.category_id == '10' ? '#990066' : this.props.data.category_id == '11' ? '#33CC99' : this.props.data.category_id == '12' ? '#CCFFCC' : this.props.data.category_id == '13' ? '#003300' : this.props.data.category_id == '14' ? '#660000' : this.props.data.category_id == '17' ? '#33CC99' : this.props.data.category_id == '18' ? '#00A68C' : this.props.data.category_id == '19' ? '#10A68C' : this.props.data.category_id == '20' ? '#00A64C' : this.props.data.category_id == '21' ? '#21A68C' : this.props.data.category_id == '22' ? '#06268C' : this.props.data.category_id == '23' ? '#00A68C' : '#BFD833',
        };
    }
    deleteNote(id){
        if(id !== undefined){
            this.props.dispatch(deleteNotes(id))
        }
        this.props.navigation.navigate('Home');
    }
    deleteHandler(item){
        Alert.alert(
            'Are you sure you want to delete this note ?',
            'This note will be deleted immediately, you can\'t undo this action.',
            [
              { text: 'Cancel', onPress: () => console.log('delete canceled')},
              {text: 'OK', onPress: () => this.deleteNote(item.id)},
            ],
            {cancelable: false},
          );
    }
    render(){
        return(
            <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('EditNote', this.props.data)}}
                onLongPress={()=>{this.deleteHandler(this.props.data)}}
                style={[styles.card,{backgroundColor:this.state.cardColor}]}>

                <Text style={styles.create}>{this.state.createdAt.getDate()} {this.state.monthList[this.state.createdAt.getMonth()]}</Text>
                <Text numberOfLines={1} style={styles.title}>{this.props.data.title}</Text>
                <Text numberOfLines={1} style={styles.category}>{this.props.data.category}</Text>
                <Text numberOfLines={4} style={styles.note}>{this.props.data.note}</Text>
            
            </TouchableOpacity>
        )
    }
};

// map state to props to referring data in store
const mapStateToProps = state => {
    return {
        notes: state.notes
    }
  }
  
// connect with redux,first param is map and second is component
export default connect(mapStateToProps)(Card);
  

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderRadius: 5,
        margin:20,
        paddingRight:20,
        width:138,
        height:136,
        color: '#fff',
    },
    create:{
        fontSize:11,
        alignSelf:'flex-end',
        color: '#fff',
        right:-10,
        top:5
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        top:10,
        left:10,
    },
    category:{
        color: '#FFFBFB',
        fontSize: 10,
        top:8,
        left:10
    },
    note:{
        color: '#fff',
        fontSize:12,
        top:10,
        left:10
    }
  });