const { Controller } = require("egg");

const createRuleQuery = {
    year: {
        required: true,
        type: "number"
    },
    month: {
        required: true,
        type: "number"
    },
    date: {
        required: true,
        type: "number"
    }
}
const createRuleUpdate = {
    type: {
        require: true,
        type: 'string'
    },
    time: {
        require: true,
        type: 'object'
    },
    recordList: {
        require: true,
        type: 'array'
    }
}

class CalendarController extends Controller {
    async queryAll() {
        const { ctx } = this;
        ctx.validate(createRuleQuery, ctx.request.body);
        const {
            year,
            month,
        } = ctx.request.body;
        const dateList = await ctx.service.calendar.getDateList(year, month);
        const monthList = await ctx.service.calendar.getMonthList(year);
        ctx.body = {
            dateList,
            monthList
        };
        ctx.status = 200;
    }
    async updateRecords() {
        this.ctx.validate(createRuleUpdate, this.ctx.request.body);
        const {
            type,
            time: {
                year,
                month,
                date
            },
            recordList
        } = this.ctx.request.body;
        try {
            if (type === 'month') {
                await this.ctx.service.calendar.updateRecordsTransaction('date_record_list', `${year}-${month}-${date}`, recordList);
            } else if (type === 'year') {
                await this.ctx.service.calendar.updateRecordsTransaction('month_record_list', `${year}-${month}`, recordList);
            }
            this.ctx.body = {
                code: 1,
                toast: '更新成功'
            }
        } catch (err) {
            this.ctx.body = {
                code: -1,
                toast: '更新失败'
            }
            this.ctx.body = 200;
        }
    }

}
module.exports = CalendarController;