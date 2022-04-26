import { useDispatch } from 'react-redux'
import { deleteTransaction } from '../features/transactions/transactionSlice';
import { numberWithCommas } from '../utils/format';

function Transaction({ transaction }) {
    const dispatch = useDispatch()

    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => dispatch(deleteTransaction(transaction._id))} className="delete-btn">x</button>
        </li>
    )
}

export default Transaction