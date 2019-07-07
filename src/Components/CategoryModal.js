import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { insertCategories} from '../Public/redux/action/notes';

class CategoryModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            name        : '',
            image_url   : '',
            width       : Dimensions.get('window').width,
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = () => {
        this.props.setModalVisibility(false);
    }

    insertCategories = () => {
        const {name, image_url} = this.state;
        if(name !== ''){
            this.props.dispatch(insertCategories({name, image_url}))
        }
        this.closeModal();
    }

    render (){
        return (
            <View style={styles.contentContainer}>
                <TouchableOpacity activeOpacity={0.5} style={styles.contentSide} onPress={() => this.closeModal()} ></TouchableOpacity>
                <View style={styles.modal /*{width: this.state.width * 0.7}*/}>
                    <View>
                        <TextInput placeholder={'Category Name'} onChangeText={(text) => this.setState({name:text})} underlineColorAndroid={'#2ED1A2'} style={styles.textInput}/>
                        <TextInput placeholder={'Image Url'} onChangeText={(text) => this.setState({image_url:text})} underlineColorAndroid={'#2ED1A2'} style={styles.textInput}/>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addButton} onPress={() => this.insertCategories()} >
                            <Text style={{fontFamily: 'Open Sans', fontStyle: 'normal', fontWeight: '600', fontSize: 15, lineHeight: 20, color: '#000000',}}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => this.closeModal()} >
                            <Text style={{fontFamily: 'Open Sans', fontStyle: 'normal', fontWeight: '300',fontSize: 15, lineHeight: 20, color: '#A7A7A7'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps)(CategoryModal)

const styles = StyleSheet.create({
    contentContainer: {
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    },
    contentSide:{
        flex:1,
        opacity:0.5,
        backgroundColor:'gray'
    },
    modal:{
        right:60,
        width:230,
        paddingTop:20,
        backgroundColor:'#FFF',
        position:'absolute',
        alignContent:'center',
        justifyContent:'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 3,
        borderRadius:5,
    },
    text:{
        left:10,
        fontSize:15,
        color:'#000'
    },
    textInput:{
        marginLeft:30,
        marginRight:30,
    },
    footer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        padding:15,
    },
    addButton:{
        marginRight:15,
    },
    cancelButton:{
        marginRight:10,
    }
});