/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  async componentDidMount() {
    // fetch data from credits API
    const creditsResponse = await fetch("https://johnnylaicode.github.io/api/credits.json");
    let creditsData = await creditsResponse.json();
    creditsData.forEach(credit => {
      this.state.creditList.push(credit);
    });

    // fetch data from debits API
    const debitsResponse = await fetch("https://johnnylaicode.github.io/api/debits.json");
    const debitsData = await debitsResponse.json();
    debitsData.forEach(debit => {
      this.state.debitList.push(debit);
    });
    this.updateBalance();
  }

  updateBalance() {
    let creditTotal = 0;
    this.state.creditList.forEach(credit => {
      creditTotal += credit.amount;
    });

    let debitTotal = 0;
    this.state.debitList.forEach(debit => {
      debitTotal += debit.amount;
    });

    let newBalance = creditTotal - debitTotal;
    this.setState({accountBalance: newBalance});
  }

  // Add a new credit to creditList
  addCredit = (e) => {
    e.preventDefault();

    let credit = {};

    credit.id = parseInt(this.state.creditList.length + 1);
    credit.description = e.target[0].value;
    credit.amount = parseFloat(e.target[1].value);
    credit.date = new Date().toISOString();

    this.state.creditList.push(credit);
    e.target.reset();

    this.updateBalance();

  }

  // Add a new credit to creditList
  addDebit = (e) => {
    e.preventDefault();

    let debit = {};

    debit.id = parseInt(this.state.debitList.length + 1);
    debit.description = e.target[0].value;
    debit.amount = parseFloat(e.target[1].value);
    debit.date = new Date().toISOString();

    this.state.creditList.push(debit);
    e.target.reset();

    this.updateBalance();

  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/my-react-app">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;