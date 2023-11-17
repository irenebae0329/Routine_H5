
export function globalReducer(state, action) {
  const {
      type,
      dateIndex,
      monthList,
      dateList,
      value,
      monthIndex,
      source,
      year,
      mode
  } = action;
  const newdateList = [...state.dateList];
  const newMonthList = [...state.monthList];
  switch (type) {
      case 'modify_date_and_month_list':
          return {
              ...state,
              monthList: monthList,
              dateList: dateList
          }
      case 'modify_date_records':
          newdateList[dateIndex] = value;
          return {
              ...state,
              dateList: newdateList
          };
      case 'modify_month_records':
          console.log(newMonthList, value);
          newMonthList[monthIndex] = value;
          return {
              ...state,
              monthList: newMonthList
          }
      case 'modify_Calender_panel_info':
          return {
              ...state,
              calendarPanelInfo: {
                  ...state.calendarPanelInfo,
                  year,
                  dateIndex: dateIndex,
                  monthIndex: monthIndex,
                  source,
              }
          }
      case 'modify_info_source':
          return {
              ...state,
              calendarPanelInfo: {
                  ...state.calendarPanelInfo,
                  mode: mode
              }
          }
      default:
          break;
  }

}
