import React, {Component} from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator} from "react-navigation";
import { Provider } from 'react-redux' // import to wrap component in redux

import DrawerNavigation from './src/Components/DrawerNavigation';
import HeaderNavigation from './src/Components/HeaderNavigation';

import HomeScreen from './src/Screens/HomeScreen';
import AddNoteScreen from './src/Screens/AddNote';
import EditNoteScreen from './src/Screens/EditNote';



// import store
import store from './src/Public/redux/store';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header:(<HeaderNavigation navigation={navigation} screen={'Home'}/>)
    }),
  },
  AddNote: {
    screen: AddNoteScreen,
    navigationOptions: ({navigation}) => ({
      header:(<HeaderNavigation navigation={navigation} screen={'AddNote'}/>)
    }),
  },
  EditNote: {
    screen: EditNoteScreen,
    navigationOptions: ({navigation}) => ({
      header:(<HeaderNavigation navigation={navigation} screen={'EditNote'}/>)
    }),
  },
});

const MyDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator,
    }
  },
  {
    contentComponent: DrawerNavigation,
    drawerWidth:235
  }
);

const AppContainer = createAppContainer(MyDrawer);

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}