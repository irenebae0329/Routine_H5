const Service = require('egg').Service;
function getDaysOfMonth(year, month) {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
}
class CalendarService extends Service {
    async updateRecordsTransaction(table, time, recordList) {
        return await this.app.mysql.beginTransactionScope(async (conn) => {
            await conn.delete(table, {
                time: time,
            });
            recordList.forEach(async (record, index) => {
                await conn.insert(table, {
                    key: `${time}-${index}`,
                    content: record,
                    time: time
                })
            })
        })
    }
    async getDateList(year, month) {
        const totalDays = getDaysOfMonth(year, month);
        let res = [[]];
        for (let date = 1; date <= totalDays; date++) {
            let queryRes = await this.app.mysql.select('date_record_list', {
                where: {
                    time: `${year}-${month}-${date}`
                },
                columns: ['content']
            })
            res[date] = queryRes.map((res)=>res.content);
        }
        return res
    }
    async getMonthList(year) {
        let res = []
        for (let month = 1; month <= 12; month++) {
            let queryRes = await this.app.mysql.select('month_record_list', {
                where: {
                    time: `${year}-${month}`
                },
                columns: ['content']
            });
            res.push(queryRes.map(obj => obj.content));
        }
        return res;
    }
}
module.exports = CalendarService;