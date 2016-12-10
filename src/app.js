import firebase from 'firebase'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button, Spinner } from './components/common'
// This will import all the dependencies from index.js
import LoginForm from './components/LoginForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: null
    }
  }
  componentWillMount () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAntEpYJdw0YGUW-g80rF-bUYnCTG1rzuk',
      authDomain: 'auth-d39f0.firebaseapp.com',
      databaseURL: 'https://auth-d39f0.firebaseio.com',
      storageBucket: 'auth-d39f0.appspot.com',
      messagingSenderId: '1017792501510'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner size='large' />
    }
  }

  render () {
    return (
      <View>
        <Header headerText='Authentication'/>
        {this.renderContent()}
      </View>
    )
  }
}

export default App
