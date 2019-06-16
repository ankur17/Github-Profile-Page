/**
 * Created by ankur on 16/6/19.
 */


export const LanguageDotMap = {
    "JavaScript" : "yellow",
    "HTML" : "red",
    "CSS" : "purple",
    "Java" : "brown"
}

export const LANGUAGE = ["All", "JavaScript", "HTML", "CSS" ,"Java"]
export const REPO_TYPE = ["All", "Sources", "Fork", "Archived", "Mirrors"]

export const MONTH_STR = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]

export const formatDate = (dateString)=>{
    let dateObj = new Date(dateString);
    return `${dateObj.getDate()} ${MONTH_STR[dateObj.getUTCMonth()]} ${dateObj.getFullYear()}`

}