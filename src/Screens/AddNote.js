import React, {Component} from 'react';
import {View, TextInput, Text, Picker, StyleSheet, TouchableOpacity} from 'react-native';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { insertNotes} from '../Public/redux/action/notes';

class AddNote extends Component{

  constructor(props){
    super(props);
    this.Categories = this.props.notes.dataCategory;
    this.state = {
      category_id: '',
      category: '',
      note:'',
      title:''
    };
  }

  setDefaultCategory = () => {
    this.setState({ category_id:this.Categories[0].id, category:this.Categories[0].name })
  }

  updateCategory = (input) => {
    this.setState({ category:input })
    {this.Categories.map((category) => {if(category.name == input) this.setState({ category_id:category.id })
    })}
  }

  insertNote = () => {
    const {title, note, category, category_id} = this.state;
    if(title !== '' && category !== ''){
        this.props.dispatch(insertNotes({title,note,category,category_id}))
        this.props.navigation.navigate('Home');
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({insertNote : this.insertNote})
    this.setDefaultCategory();
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput placeholder="ADD TITLE..."
          onChangeText={(text) => this.setState({title:text})}
          />
          <TextInput underlineColorAndroid="transparent"
            placeholder="ADD DESCRIPTION..."
            onChangeText={(text) => this.setState({note:text})}
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