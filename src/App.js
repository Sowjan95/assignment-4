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

  // Fetch API data for credit and debit to add to respective lists
  async componentDidMount() {
    // fetch data from credits API
    const creditsResponse = await fetch("https://johnnylaicode.github.io/api/credits.json");
    // turn data into JSON array
    let creditsData = await creditsResponse.json();
    // for each credit in array, push into creditList
    creditsData.forEach(credit => {
      this.state.creditList.push(credit);
    });

    // fetch data from debits API
    const debitsResponse = await fetch("https://johnnylaicode.github.io/api/debits.json");
    // turn data into JSON array
    const debitsData = await debitsResponse.json();
    // for each debit in array, push into debitList
    debitsData.forEach(debit => {
      this.state.debitList.push(debit);
    });

    // update account balance to reflect credit and debit data
    this.updateBalance();
  }

  // Update account balance
  updateBalance() {
    
    // get total credit amount
    let creditTotal = 0;
    this.state.creditList.forEach(credit => {
      creditTotal += credit.amount;
    });

    // get total debit amount
    let debitTotal = 0;
    this.state.debitList.forEach(debit => {
      debitTotal += debit.amount;
    });

    // get new account balance
    let newBalance = creditTotal - debitTotal;
    // set account balance to new balance
    this.setState({accountBalance: newBalance});

  }

  // Add a new credit to creditList
  addCredit = (e) => {
    e.preventDefault();

    let credit = {};  // create empty credit

    credit.id = this.state.creditList.length + 1;   // next id (sequential order)
    credit.description = e.target[0].value;         // get description
    credit.amount = parseFloat(e.target[1].value);  // get amount, parse into float from string
    credit.date = new Date().toISOString();         // get current data, set to YYYY-MM-DD format

    this.state.creditList.push(credit); // add credit to creditList

    e.target.reset(); // empty form field

    this.updateBalance(); // update account balance

  }

  // Add a new debit to debitList
  addDebit = (e) => {
    e.preventDefault();

    let debit = {};   // credit empty debit

    debit.id = this.state.debitList.length + 1;    // next id (sequential order)
    debit.description = e.target[0].value;         // get description
    debit.amount = parseFloat(e.target[1].value);  // get amount, parse into float from string
    debit.date = new Date().toISOString();         // get current data, set to YYYY-MM-DD format

    this.state.debitList.push(debit);  // add debit to debitList

    e.target.reset(); // empty form field

    this.updateBalance(); // update account balance

  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />)
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-4">
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