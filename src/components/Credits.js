/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.


Displaying List of Credits:

GIVEN I am on the Credits Page
WHEN I view the Credits display area
THEN I shall see all my Credits displayed in a list, including the Credits retrieved from API endpoint
AND each Credit shall display its description, amount, and date (yyyy-mm-dd)
AND all amounts are rounded to 2 decimal places (e.g., 1234567.89)


==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Credits extends Component {
  render() {
    return (
      <div>
        <h1>Credits</h1>

        <div>Descripton: {this.props.description}</div>
        <div>Amount: {this.props.amount}</div>
        <div>Date: {this.props.date}</div>
        <br/>
        <AccountBalance accountBalance={this.props.accountBalance}/>
        <br/><br/>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;