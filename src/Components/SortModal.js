import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { getNotes } from '../Public/redux/action/notes';

class SortModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = () => {
        this.props.setModalVisibility(false);
    }
    sortData(sort){
        let {search, selectedCategory} = this.props.notes;
        this.props.dispatch(getNotes({sort, search, selectedCategory}));
    }

    render (){
        return (
            <View style={styles.contentContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.contentSide} onPress={() => this.closeModal()} ></TouchableOpacity>
                <View style={styles.modal /*{width: this.state.width * 0.4}*/}>
                    <TouchableOpacity onPress={() => this.sortData('ASC')} style={styles.buttonView}>
                        <Text style={styles.text}> ASCENDING </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.sortData('DESC')} style={styles.buttonView}>
                        <Text style={styles.text}> DESCENDING </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// map state to props to referring data in store
const mapStateToProps = state => {
    return {
        notes: state.notes
    }
  }
  
  // connect with redux,first param is map and second is component
  export default connect(mapStateToProps)(SortModal)

const styles = StyleSheet.create({
    contentContainer: {
        top:50,
        flex:1,
    },
    contentSide:{
        flex:1,
        opacity:0
    },
    modal:{
        backgroundColor:'#FFF',
        position:'absolute',
        right:5,
        top:5,
        alignContent:'center',
        justifyContent:'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderRadius:3
    },
    text:{
        left:3,
        fontSize:15,
        color:'#000'
    },
    buttonView:{
        padding:10,
        margin:10
    }

  });