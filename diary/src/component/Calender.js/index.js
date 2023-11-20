import React, { useContext } from 'react';
import { Badge, Calendar as ACalender, Popover, Select } from 'antd';
import { globalContext } from '../../ctx/globalContext';
import { drawerContext } from '../../ctx/drawerContext';
import './index.scss';
export const TASK_STATUS = {
    REQUIRED: '0',
    OPTION: '1',
}
const selectOptions = [
    {
        label: '必做',
        value: TASK_STATUS.REQUIRED
    },
    {
        label: '选做',
        value: TASK_STATUS.OPTION
    }
]
export function Calendar() {
    const {
        setOpen,
    } = useContext(drawerContext);
    const {
        globalState,
        dispatch
    } = useContext(globalContext);
    const {
        dateList,
        monthList,
        calendarPanelInfo: {
            monthIndex,
            mode,
        }
    } = globalState;
    const handleSelect = (curDay, info) => {
        setOpen(true);
        dispatch({
            type: 'modify_Calender_panel_info',
            dateIndex: curDay.date(),
            monthIndex: curDay.month(),
            year: curDay.year(),
            source: info.source,
        })
    }

    const cellRender = (curDay) => {
        if ((monthIndex !== curDay.month() && mode == 'month')) {
            return null;
        }
        const listSortFunction = (a, b) => {
            return (Number(a.value.status) - Number(b.value.status));
        }
        const renderMonthCell = (curMonth) => {
            const currMonthList = monthList[curMonth];
            if (!currMonthList || !currMonthList.length) {
                return null;
            }
            return (
                <ul className='date-cell-list'>
                    {currMonthList.sort(listSortFunction).map((obj, index) => {
                        return  <CalendarCellListItem obj={obj} month_or_date_Index={curMonth} recordIndex={index} mode="year"></CalendarCellListItem>
                    })}
                </ul>
            )
        }
        const renderDateCell = (curDate) => {
            const currDateList = dateList[curDate];
            if (!currDateList || !currDateList.length) {
                return null;
            }

            return (
                <ul className='month-cell-list'>
                    {currDateList.sort(listSortFunction).map((obj, index) => {
                        return (
                            <CalendarCellListItem obj={obj} month_or_date_Index={curDate} recordIndex={index} mode="month"></CalendarCellListItem>
                        )
                    })}
                </ul>
            )
        }

        switch (mode) {
            case 'year':
                return renderMonthCell(curDay.month());
            case 'month':
                return renderDateCell(curDay.date());
        }
    }

    return (
        <div className='calendar-container'>
            <ACalender onSelect={handleSelect} cellRender={cellRender} className='calendar' onPanelChange={(_, mode) => {
                dispatch({
                    type: 'modify_info_source',
                    mode: mode
                })

            }}></ACalender>
        </div>
    )
}

function CalendarCellListItem({ obj, month_or_date_Index, recordIndex, mode, key }) {
    const {
        value: {
            content,
            status
        }
    } = obj;

    const {
        globalState: {
            dateList,
            monthList
        },
        dispatch
    } = useContext(globalContext);

    const handleChangeTaskStatus = (value) => {

        const listToModify = (mode == 'month' ? dateList : monthList);
        
        const indexType = mode == 'month' ? 'dateIndex' : 'monthIndex';
        dispatch({
            type: `${mode == 'month' ? 'modify_date_records' : 'modify_month_records'}`,
            [indexType]: month_or_date_Index,
            value: listToModify[month_or_date_Index].map((obj, index) => {
                if (index == recordIndex) {
                    return {
                        editing: obj.editing,
                        value: {
                            content: obj.value.content,
                            status: value
                        }
                    }
                } else {
                    return obj
                }
            })
        });
    };
    return (
        <Popover content={
            <Select
                defaultValue={status}
                options={selectOptions}
                onSelect={handleChangeTaskStatus}
                onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                }}
                key={key}
            ></Select>
        }
            title="确认完成">
            <li className='todo-record-item'>
                {<Badge status={status == TASK_STATUS.REQUIRED ? 'success' : 'warning'} text={content} key={key}></Badge>}
            </li>
        </Popover>
    )
}