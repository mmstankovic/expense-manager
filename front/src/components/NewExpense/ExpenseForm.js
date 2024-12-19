import classes from './ExpenseForm.module.css'
import { useState } from 'react'


const ExpenseForm = (props) => {
    const [enteredName, setEnteredName] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')
    const [enteredDate, setEnteredDate] = useState('')
    const [nameInputIsTouched, setNameInputIsTouched] = useState(false)
    const [amountInputIsTouched, setAmountInputIsTouched] = useState(false)

    const validateNameInputHandler = () => {
        setNameInputIsTouched(true)
    }
    const validateAmountInputHandler = () => {
        setAmountInputIsTouched(true)
    }
    
    const enteredNameIsValid = enteredName.trim() !== ''
    const nameInputIsInvalid = !enteredNameIsValid && nameInputIsTouched
    const enteredAmountIsValid = enteredAmount.trim() !== ''
    const amountInputIsInvalid = !enteredAmountIsValid && amountInputIsTouched

    let formIsValid = false 

    if(enteredNameIsValid && enteredAmountIsValid) {
        formIsValid = true
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(!formIsValid) {
            return
        }

        const new_expense = {
            name: enteredName,
            amount: +enteredAmount,
            date: new Date(enteredDate),
            id: 'e' + Math.floor(Math.random() * 1000) + 1
        }
       
        props.onAdd(new_expense)
        setEnteredName('')
        setEnteredDate('')
        setEnteredAmount('')

        setNameInputIsTouched(false)
        setAmountInputIsTouched(false)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={classes['form-controls']}>
                <div className={classes['form-control']}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={enteredName} onChange={(e) => setEnteredName(e.target.value)} onBlur={validateNameInputHandler}/>
                    {nameInputIsInvalid && <p className={classes.invalid}>Please enter a title!</p>}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" type="text" value={enteredAmount} onChange={(e) => setEnteredAmount(e.target.value)} onBlur={validateAmountInputHandler} placeholder='Use negative value (-) for expenses.'/>
                    {amountInputIsInvalid && <p className={classes.invalid}>Please enter an amount!</p>}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" value={enteredDate} onChange={(e) => setEnteredDate(e.target.value)}/>
                </div>
               
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onHide}>Cancel</button>
                <button disabled={!formIsValid} type="submit">{props.isLoading ? 'Loading...' : 'Add'}</button>
            </div>
        </form>
    )
}
export default ExpenseForm