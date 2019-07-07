import React, {Component} from 'react';
import {View, TextInput, Text, Picker, StyleSheet, TouchableOpacity} from 'react-native';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { updateNotes} from '../Public/redux/action/notes';

class AddNote extends Component{

  constructor(props){
    super(props);
    this.Categories = this.props.notes.dataCategory;
    this.state = {
      id:'',
      category_id: '',
      category: '',
      note:'',
      title:''
    };
  }

  setDefaultCategory = () => {
    console.log(this.props.navigation.state.params)
    this.setState({
      id          : this.props.navigation.state.params.id,
      category_id : this.props.navigation.state.params.category_id,
      category    : this.props.navigation.state.params.category,
      note        : this.props.navigation.state.params.note,
      title       : this.props.navigation.state.params.title})
  }

  updateCategory = (input) => {
    this.setState({ category:input })
    {this.Categories.map((category) => {
      if(category.name == input) this.setState({ category_id:category.id })
    })}
  }

  updateNote = () => {
    const {id, title, note, category, category_id} = this.state;
    if(title !== '' && category !== ''){
        this.props.dispatch(updateNotes({id, title, note, category_id}))
        this.props.navigation.navigate('Home');
    }
  }

  
  componentDidMount = () => {
    this.props.navigation.setParams({updateNote : this.updateNote})
    this.setDefaultCategory();
  }


  render() {
    return (
      <View style={styles.container}>
          <TextInput placeholder="ADD TITLE..."
          onChangeText={(text) => this.setState({title:text})}
          value={this.state.title}
          />
          <TextInput underlineColorAndroid="transparent"
            placeholder="ADD DESCRIPTION..."
            onChangeText={(text) => this.setState({note:text})}
            value={this.state.note}
            multiline={true} />
          <View>
            <Picker selectedValue = {this.state.category} onValueChange = {this.updateCategory}>
              {this.Categories.map((category, key) => 
              <Picker.Item key={key} label = {category.name} value = {category.name} />)}
            </Picker>
          </View>
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
export default connect(mapStateToProps)(AddNote)

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
});