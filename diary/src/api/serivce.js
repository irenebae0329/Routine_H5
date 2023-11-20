import isMock from "./env";
import { mockMothData, mockYearData } from "./mockData";
import { doRequest } from "../request/http";
import { message } from "antd";
export async function getListDataApi(params) {
    if (isMock) {
        const { year, month } = params;
        return new Promise((resolve) => {
            resolve({
                dateList: mockMothData?.[year]?.[month],
                monthList: mockYearData[year]
            });
        })
    } else {
        try {
            const resList = await doRequest('/calendar/queryAll', params);
            const {
                dateList,
                monthList
            } = resList;
            return {
                dateList:dateList.map((recordList)=>{
                    return recordList.map((value)=>{
                        return {
                            value:value,
                            editing:false,
                        }
                    }) 
                }),
                monthList:monthList.map((recordList)=>{
                    return recordList && recordList.map((value)=>{
                        return {
                            value:value,
                            editing:false,
                        }
                    }) 
                })  
            }
        }
        catch (err) {
            message.error('请求失败');
            return {
                dateList:[],
                monthList:[]
            }
        }
    }
}
export async function updateRecords(params){
   
    try{
        message.loading('更新中');
        const response = await doRequest('/calendar/updateRecords',params);
        const {
            code,
            toast
        } = response;
        if(code === -1){
            throw new Error('更新失败');
        }
        message.success('更新完成');
        return {
            success:true,
            toast
        };
    }catch(err){
        return {
            success:false,
            toast:'更新失败'
        }
    }finally{
        message.destroy();
    }
}