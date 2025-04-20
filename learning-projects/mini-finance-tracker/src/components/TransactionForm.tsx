import React, { useState } from 'react';
import { Transaction } from '../types/transaction';

type TransactionFormProps = {
    onSubmit: (transaction: Transaction) => void
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
return (
    <form>
        <h2> Add New Transaction </h2>

        <div>
            <label>Amount:</label>
            <input type="number" />
        </div>

        <div>
            <label>Type:</label>
            <select>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
        </div>

        <div>
            <label>Date:</label>
            <input type="date" />
        </div>

        <div>
            <label>Description:</label>
            <input type="text" />
        </div>
    </form>
)
}