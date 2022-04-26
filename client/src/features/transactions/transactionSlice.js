import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from './transactionService'

const initialState = {
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create New Transaction
export const createTransaction = createAsyncThunk('transactions/create', async(transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await transactionService.createTransaction(transactionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Show Transactions
export const getTransactions = createAsyncThunk('transactions/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await transactionService.getTransactions(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

/* // Update transaction
export const updateTransaction = createAsyncThunk("transactions/update", async ({ transactionId, transactionData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await transactionService.updateTransaction(transactionId, transactionData, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  ); */

// Delete User Transaction
export const deleteTransaction = createAsyncThunk('transactions/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await transactionService.deleteTransaction(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transactions.push(action.payload)
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transactions = (action.payload)
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.transactions = state.transactions.filter((transaction) => transaction._id !== action.payload.id)
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /* .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.transactions = state.transactions.map((transaction) =>
                transaction._id !== action.payload.id
                ? {
                    ...transaction,
                    text: action.payload
                    }
                :  transaction
            );
            })
            .addCase(updateTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            }); */
    }, 
})

export const { reset } = transactionSlice.actions
export default transactionSlice.reducer