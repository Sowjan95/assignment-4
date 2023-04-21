/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  
    // Create the list of Credit items
    let creditsView = () => {
      const { credits } = props;
      return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
        let date = credit.date.slice(0,10);
        return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
      });
    }
    // Render the list of Debit items and a form to input new Debit item
    return (
      <div>
        <h1>Credits</h1>
  
        {creditsView()}
  
        <form onSubmit={props.addCredit}>
          <label>Description: </label>
          <input type="text" name="description" />
          <label>Amount: </label>
          <input type="number" name="amount" step="0.01"/>
          <button type="submit">Add Credit</button>
        </form>
        <br/>
        <AccountBalance accountBalance={props.accountBalance}/>
        <Link to="/">Return to Home</Link>
      </div>
    );

}

export default Credits;
