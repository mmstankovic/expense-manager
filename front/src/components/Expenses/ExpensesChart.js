import LineChart from "../Chart/LineChart"

const ExpensesChart = (props) => {
    const chartDataPoints = [
        {name: 'Jan', value: 0},
        {name: 'Feb', value: 0},
        {name: 'Mar', value: 0},
        {name: 'Apr', value: 0},
        {name: 'May', value: 0},
        {name: 'Jun', value: 0},
        {name: 'Jul', value: 0},
        {name: 'Aug', value: 0},
        {name: 'Sep', value: 0},
        {name: 'Oct', value: 0},
        {name: 'Nov', value: 0},
        {name: 'Dec', value: 0}
    ]

    for(let expense of props.expenses) {
        
        const expenseForMonth = expense.date.getMonth()
        chartDataPoints[expenseForMonth].value += expense.amount
    }

    const expesesData = {
        labels: chartDataPoints.map((data) => data.name),
        datasets: [
            {
                label: 'Expenses',
                data: chartDataPoints.map((data) => data.value < 0 ? data.value : 0),
                backgroundColor: ['#FC635B'],
                borderColor: '#FC635B',
                borderWidth: 1,
                tension: 0.4,
                display: true
            },
            {
                label: 'Income',
                data: chartDataPoints.map((data) => data.value > 0 ? data.value : 0),
                backgroundColor: ['#008253'],
                borderColor: '#008253',
                borderWidth: 1,
                tension: 0.4
            },
        ]
    }
    
    return (
        <div style={{backgroundColor: '#fff'}}>
            <LineChart chartData={expesesData}/>
        </div>
    )   
}
export default ExpensesChart