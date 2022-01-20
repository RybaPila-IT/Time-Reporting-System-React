const MonthId = (username, date) => {
    return `${username}-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default MonthId;