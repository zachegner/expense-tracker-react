import Transaction from "./Transaction"

function TransactionList({ transactions }) {
  const transactionArr = Array.from(transactions)

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactionArr.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
      </ul>
    </>
  )
}

export default TransactionList