import React, { useContext } from 'react';
import { Badge, Calendar as ACalender } from 'antd';
import { globalContext } from '../../ctx/globalContext';
import { drawerContext } from '../../ctx/drawerContext';
import './index.scss';
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
            year,
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
        const renderMonthCell = (curMonth) => {
            const currMonthList = monthList[curMonth];
            if (!currMonthList || !currMonthList.length) {
                return null;
            }
            return (
                <ul className='date-cell-list'>
                    {currMonthList.map((obj, index) => {
                        return (
                            <li key={index}>
                                {<Badge status='success' text={obj?.value} key={index}></Badge>}
                            </li>)
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
                    {currDateList.map((obj, index) => {
                        return (
                            <li key={index}>
                                {<Badge status='success' text={obj?.value} key={index}></Badge>}
                            </li>)
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
            <ACalender onSelect={handleSelect} cellRender={cellRender} className='calendar' onPanelChange={(thisdate, mode) => {
                dispatch({
                    type: 'modify_info_source',
                    mode:mode              
                  })

            }}></ACalender>
        </div>
    )
}