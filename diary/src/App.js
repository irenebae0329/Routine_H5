import React, { useReducer, useState, useEffect, useLayoutEffect } from "react";
import { Calendar } from "./component/Calender.js";
import { Drawer } from "./component/Drawer/index.js";
import { globalReducer } from "./reducer/globalReducer.js";
import { globalContext } from "./ctx/globalContext";
import { drawerContext } from "./ctx/drawerContext.js";
import { getListDataApi } from "./api/serivce.js";
import Layout, { Content, Header, Footer } from "antd/es/layout/layout.js";
function App() {
  const [globalState, dispatch] = useReducer(globalReducer, {
    dateList: new Array(31).fill(null),
    monthList: new Array(12).fill(null),
    calendarPanelInfo: {
      year: new Date().getFullYear(),
      monthIndex: new Date().getMonth(),
      dateIndex: new Date().getDay(),
      mode: 'month',
    }
  });
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    const {
      calendarPanelInfo
    } = globalState;
    if (!calendarPanelInfo.source) {
      setOpen(false);
    } else if ((calendarPanelInfo.mode == 'month' && calendarPanelInfo.source != 'date') || (calendarPanelInfo.mode == 'year' && calendarPanelInfo.source != 'month')) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [globalState.calendarPanelInfo.year, globalState.calendarPanelInfo.monthIndex]);
  useEffect(() => {
    const {
      year,
      dateIndex,
      monthIndex,
      source,
      mode
    } = globalState.calendarPanelInfo;
    !(source == 'month' && mode == 'year') && getListDataApi({
      year: year,
      month: monthIndex + 1,
      date: dateIndex
    }).then((({ dateList, monthList }) => {
      dispatch({
        type: 'modify_date_and_month_list',
        dateList,
        monthList
      })
    }));
  }, [globalState.calendarPanelInfo.year, globalState.calendarPanelInfo.monthIndex])
  return (
    <globalContext.Provider value={{
      globalState,
      dispatch
    }}>
      <drawerContext.Provider value={
        {
          open: open,
          setOpen: setOpen,
        }
      }>
        <Layout className="layout">
          <Header className="header">自律计划表</Header>
          <Content>
            <Calendar></Calendar>
          </Content>
          <Footer className="footer">我是页脚</Footer>
        </Layout>
        <Drawer key={`${JSON.stringify(globalState)}`}></Drawer>
      </drawerContext.Provider>
    </globalContext.Provider>);
}
export default App;