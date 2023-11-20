import { useContext, useEffect, useState } from "react";
import { Drawer as ADrawer, Empty, Button, List, Input, message } from "antd";
import { drawerContext } from "../../ctx/drawerContext";
import { globalContext } from "../../ctx/globalContext";
import { updateRecords } from "../../api/serivce";
import { TASK_STATUS } from "../Calender.js";
import './index.scss'
export function Drawer() {
    const {
        open: show,
        setOpen: setShow,
    } = useContext(drawerContext);
    const {
        globalState,
        dispatch
    } = useContext(globalContext);
    const {
        dateList,
        monthList,
        calendarPanelInfo: {
            mode,
            dateIndex,
            monthIndex,
            year
        }
    } = globalState;
    const [cellTodo, setcellTodo] = useState((mode === 'month' ? dateList[dateIndex] : monthList[monthIndex]) || []);

    return (
        <>
            <ADrawer title={renderTitle()} open={show} onClose={() => {
                setShow(false);
                const originalList = mode === 'month' ? dateList[dateIndex] : monthList[monthIndex];
                if (JSON.stringify(originalList) === JSON.stringify(cellTodo)) {
                    return;
                }

                updateRecords({
                    type: mode,
                    time: {
                        year,
                        month: monthIndex + 1,
                        date: dateIndex
                    },
                    recordList: [...cellTodo.map((obj) => obj.value)]
                }).then(({
                    success,
                    toast
                }) => {
                    if (success) {
                        if (mode === "month") {
                            dispatch({
                                type: 'modify_date_records',
                                dateIndex: dateIndex,
                                value: [...cellTodo.filter((value) => value != '')]
                            });
                        }
                        else {
                            dispatch({
                                type: 'modify_month_records',
                                monthIndex: monthIndex,
                                value: [...cellTodo.filter((value) => value != '')]
                            })
                        }
                    } else {
                        message.error(toast)
                    }
                })


            }} >
                {renderDrawerContent()}
            </ADrawer >
        </>
    )
    function renderTitle() {
        const handleOnClick = () => {
            setcellTodo([
                ...cellTodo,
                {
                    value:{
                        content:'',
                        status:TASK_STATUS.REQUIRED
                    } ,
                    editing: true
                }
            ])
        }
        return (
            <div className="title">
                {mode == 'month' ? '今日待办' : '本月待办'}
                <Button className="header-button" type="primary" onClick={handleOnClick}>添加待办项目</Button>
            </div>
        )
    }
    function renderDrawerContent() {
        if (!cellTodo || cellTodo.length === 0) {
            return <Empty description={false}></Empty>
        }

        const ListItem = ({ value, index, setcellTodo, cellTodo }) => {
            const {
                editing,
                value: {
                    content: defaultValue,
                    status
                }
            } = value;

            const [inputValue, setInputValue] = useState(defaultValue);

            const handleDelete = () => {
                setcellTodo([
                    ...cellTodo.slice(0, index),
                    ...cellTodo.slice(index + 1, cellTodo.length)
                ])
            }
            const handleSave = () => {
                if (inputValue === '') {
                    message.error('不能为空');
                } else {
                    setcellTodo(cellTodo.map((value, curIdx) => {
                        if (curIdx === index) {
                            return {
                                value: {
                                    content: inputValue,
                                    status
                                },
                                editing: false
                            };
                        }
                        return value;
                    }))
                }
            }
            const handleEditing = () => {
                setcellTodo(cellTodo.map((value, curIdx) => {
                    if (curIdx === index) {
                        return {
                            value: inputValue,
                            editing: true
                        };
                    }
                    return value;
                }))
            }
            return (
                <List.Item actions={[<a onClick={handleDelete}>delete</a>, editing ? <a onClick={handleSave}>save</a> : <a onClick={handleEditing}>edit</a>]} key={index} style={{
                    height: '56px'
                }}>
                    {editing ? <Input defaultValue={defaultValue} onChange={(evt) => setInputValue(evt.target.value)} ></Input> : (<div>{defaultValue}</div>)}
                </List.Item>
            )
        }
        return (
            <List className="todolist">
                {
                    cellTodo.map((value, index) => {
                        return <ListItem value={value} key={index} index={index} setcellTodo={setcellTodo} cellTodo={cellTodo}></ListItem>
                    })}
            </List>
        )

    }

}