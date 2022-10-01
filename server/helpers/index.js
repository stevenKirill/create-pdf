class GenerateReceiptDate {
    createDate() {
        const date = new Date();
        return date;
    }

    createReceiptDate() {
        const currentDate = this.createDate();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        return `${day}.${month}.${year}_${hour}:${minutes}:${seconds}`
    }
}

module.exports = { GenerateReceiptDate }