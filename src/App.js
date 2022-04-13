import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpense } from './components/IncomeExpense';
import { Transactions } from './components/Transactions';
import { AddTransaction } from './components/AddTransaction';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className='container'>
        <Balance />
        <IncomeExpense />
        <Transactions />
        <AddTransaction />
      </div>
    </div>
  );
}

export default App;
