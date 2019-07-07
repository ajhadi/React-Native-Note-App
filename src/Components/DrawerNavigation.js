import React, {Component} from 'react';
import { Alert, StyleSheet, Modal, ScrollView, View,Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import CategoryModal from '../Components/CategoryModal';


// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { deleteCategories, getNotes } from '../Public/redux/action/notes';


class DrawerNavigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            _ModalVisible:false,
        };
      }
    
    setModalVisibility = (bool) => {
        this.setState({ _ModalVisible: bool});
    }

    selectCategory(selectedCategory){
        let {search, sort} = this.props.notes;
        this.props.dispatch(getNotes({sort, search, selectedCategory}));
    }

    deleteCategory(id){
        if(id !== undefined){
            this.props.dispatch(deleteCategories(id))
        }
        this.props.navigation.navigate('Home');
    }
    deleteHandler(category){
        Alert.alert(
            'Are you sure you want to delete this category ?',
            'This note will be deleted immediately, you can\'t undo this action.',
            [
              { text: 'Cancel', onPress: () => console.log('delete canceled')},
              {text: 'OK', onPress: () => this.deleteCategory(category.id)},
            ],
            {cancelable: false},
          );
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image source={require('../Assets/Image/Shaloom-Razade.jpeg')} style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Shaloom Razade
                </Text>
                <ScrollView style={styles.list}>

                    {this.props.notes.dataCategory.map((category, key) => 
                        <TouchableOpacity onLongPress={()=>{this.deleteHandler(category)}} onPress={() => {this.selectCategory(category.id)}} key={key} style={styles.listItem}>
                            <Image source={{
                        uri: category.image_url,
                        }} style={styles.listIcon}/>
                            <Text style={styles.listText}>{category.name}</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={() =>  this.setModalVisibility(true)} style={styles.listItem}>
                        <FontAwesomeIcon icon={ faPlusCircle } size={19} style={styles.listIcon}/>
                        <Text style={styles.listText}>Add Category</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Modal transparent={true} visible={this.state._ModalVisible} onRequestClose={() => this.changeModalVisibility(false)}>
                    <CategoryModal setModalVisibility={this.setModalVisibility}/>
                </Modal>
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
  export default connect(mapStateToProps)(DrawerNavigation)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 5
    },
    image:{
        width: 86,
        height: 86,               
        borderRadius: 85 / 2,                
        marginTop:35,               
        left:70                                
    },
    headerText:{
        width: 143,
        height: 22,
        left: 51,
        marginTop: 20,

        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 23,
        color:'#000000'
    },
    list: {
        marginTop: 20,
    },
    listItem:{
        height:50,
        flexDirection:'row',
    },
    listIcon:{
        left:15,
        width: 20,
        height: 20
    },
    listText: {
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 17,
        color:'#000000',
        lineHeight: 23,

        left:20

    },
})