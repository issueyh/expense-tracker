module.exports = {
    takeDate: (date) => {
        const dateStr = new Date(date)
        const year = dateStr.getFullYear()
        const month = dateStr.getMonth() + 1
        const day = dateStr.getDate()
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return `${year}-${month}-${day}`
    }
}