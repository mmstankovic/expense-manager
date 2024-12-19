import classes from './ExnpensesFilter.module.css'

const ExpensesFilter = (props) => {
    const changeFilterYear = (e) => {
        props.onSelectYear(e.target.value)
    }
    return (
        <div className={classes.filter}>
            <label>Filter by year: </label>
            <select value={props.selected} onChange={changeFilterYear}>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2025'>2025</option>
            </select>
        </div>
    )
}
export default ExpensesFilter