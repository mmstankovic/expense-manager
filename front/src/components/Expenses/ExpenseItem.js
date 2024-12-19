import classes from './ExpenseItem.module.css'
import Card from '../UI/Card'
import { FaRegWindowClose } from "react-icons/fa";

const ExpenseItem = (props) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const getMonth = props.date.getMonth()
    const expenseMonth = months[getMonth] 
    const expenseDay = props.date.getDate()
    const expenseYear = props.date.getFullYear()
    const amount = props.amount.toFixed(2)

    let cssStyles = ''

    if(amount < 0) {
        cssStyles = '#FC635B'
    } else {
        cssStyles = '#008253'
    }
    return (
        <Card className={classes['expense-item']}>
            <div className={classes['first-col']}>
                <div className={classes.date}>
                    <span>{expenseMonth}</span>
                    <span>{expenseDay}</span>
                    <span>{expenseYear}</span>
                </div>
                <div>
                    <h3>{props.name}</h3>
                </div>
            </div>
            <div className={classes['second-col']}>
                <h2 style={{color: cssStyles}}>${amount}</h2>
                <button onClick={() => props.onDelete(props.id)}><FaRegWindowClose size={22} color='#416391'/></button>
            </div>
        </Card>
    );
};
export default ExpenseItem
