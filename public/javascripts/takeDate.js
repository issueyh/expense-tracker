module.exports = {
    takeDate: function (date) {
        const dateStr = new Date(date)
        const year = dateStr.getFullYear()
        const month = ('0' + dateStr.getMonth() + 1).slice(-2)
        const day = ('0' + dateStr.getDate()).slice(-2)
        return `${year}-${month}-${day}`
    }
}