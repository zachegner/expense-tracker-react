import Header from '../components/Header'
import Balance from '../components/Balance';
import IncomeExpense from '../components/IncomeExpense';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';
import Spinner from '../components/Spinner'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTransactions, reset } from '../features/transactions/transactionSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { transactions, isLoading, isError, message } = useSelector((state) => state.transactions) 

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTransactions())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <h1>Welcome {user && user.name}</h1>
        <Header />
        <Balance transactions={transactions}/>
        <IncomeExpense transactions={transactions}/>
        <TransactionList transactions={transactions}/>
        <AddTransaction />
  </>
}

export default Dashboard