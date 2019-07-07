import React, {Component} from 'react';
import {Text, StyleSheet, FlatList, ActivityIndicator, View, TextInput, Modal} from 'react-native';

import _ from 'lodash';

// import connect to connect with redux store
import { connect } from 'react-redux';
import { getNotes, getMoreNotes, getCategories } from '../Public/redux/action/notes';

import Card from '../Components/Card';
import Fab from '../Components/Fab';
import SortModal from '../Components/SortModal';

class HomeScreen extends Component{

  constructor(props){
    super(props);
    this.limitSearch = _.debounce(this.searchData, 800);
    this.state = {
      _ModalVisible:false,
      search:'',
      notes: [],
    };
  }

  setModalVisibility = (bool) => {
    this.setState({ _ModalVisible: bool});
  }
  fetchData = () => {
      let {sort, search, selectedCategory} = this.props.notes;
      this.props.dispatch(getNotes({sort, search, selectedCategory}));
      this.props.dispatch(getCategories());
  }
  searchData = (search) =>{
      let {sort, selectedCategory} = this.props.notes;
      this.props.dispatch(getNotes({sort, search, selectedCategory}));
  }
  loadMore = () =>{
    let {sort, nextPage, search, selectedCategory} = this.props.notes;
    this.props.dispatch(getMoreNotes({sort, search, nextPage, selectedCategory}));
  }
  componentDidMount = () => {
      this.fetchData();
  }
  componentWillUnmount(){
    this.subs.forEach(sub => {
      sub.remove()
    })
  }
  _onRefresh = () => {
      let selectedCategory = "";
      let sort = "";
      let search = "";
      this.props.dispatch(getNotes({sort, search, selectedCategory}));
      this.props.dispatch(getCategories()); 
  }
  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.search}>
            <TextInput style = {styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder = "Search..."
              placeholderTextColor = "#999"
              autoCapitalize = "none"
              onChangeText={(search) => this.limitSearch(search)}
            />  
        </View>
          {
            this.props.notes.isLoading ?
              <ActivityIndicator style={styles.activityIndicator} size="large" color="#000" /> : 
              this.props.notes.isError ? 
                <Text>Error, please try again!</Text>
                :(
                  <FlatList
                    style={styles.noteList}
                    data={this.props.notes.data}
                    keyExtractor={this._keyExtractor}
                    numColumns='2'
                    onRefresh={this._onRefresh}
                    refreshing={this.props.notes.isLoading}
                    renderItem={({item}) => <Card navigation={this.props.navigation} data={item}/>}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => {this.loadMore()}}
                  />
                )
          }
        <Fab navigation={this.props.navigation}/>
        <Modal transparent={true} visible={this.state._ModalVisible} onRequestClose={() => this.changeModalVisibility(false)}>
          <SortModal setModalVisibility={this.setModalVisibility}/>
        </Modal>
      </View>
    );
  }
}

// map state to props to referring data in store
const mapStateToProps = state => {
  return {
      notes: state.notes
  }
}

// connect with redux,first param is map and second is component
export default connect(mapStateToProps)(HomeScreen)

/*======================StyleSheet=======================*/
const styles = StyleSheet.create({
  container: {
    paddingTop:0,
    justifyContent: 'center',
    backgroundColor: '#FAFEFF',
    alignItems:'center'
  },
  activityIndicator: {
    paddingTop: 300,
    position : 'absolute',
  },
  noteList: {
    marginTop: 70,
    paddingBottom:100
  },
  input: {
      marginHorizontal: 20,
      height: 37,
      borderColor: '#999',
      borderWidth: 0,
      color:'#999'
    },
    search: {
      padding:0,
      position:'absolute',
      marginTop:20,
      marginHorizontal:20,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.6,
      elevation: 3,
      borderColor: '#999',
      borderWidth: 0,
      borderRadius:25,
      backgroundColor:'#FFF',
      opacity:0.9,
      width:304,
      top:0,
      zIndex:1
    }
});