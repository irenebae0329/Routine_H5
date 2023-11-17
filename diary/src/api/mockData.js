const octoberPlanList = new Array(31).fill(null)

octoberPlanList[0] = [1,2,3,4];
export const mockMothData = {
    2023:{
        0:octoberPlanList,
        1:octoberPlanList,
        9:octoberPlanList,
    }
}
const yearList = new Array(12).fill(null);
yearList[9] = [1,2,3,4]
export const mockYearData = {
    2023:yearList
}