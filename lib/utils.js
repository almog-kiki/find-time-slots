//Timestamps are formatted per ISO 8601 notation.

const convertISOTimestampToHour =(time)=>{
    let theHour = time.split(/T/)[1].split(":");
    return theHour[0]+":"+theHour[1]
}

const getAllMeetingsHours = (inputData) => {
    return inputData.map(pp => {
        let startTime = convertStringToHour(pp[0])
        let endTime = convertStringToHour(pp[1])
        return [startTime,endTime]
     })
}

const getCurrentDate = (fullDate) =>{
    let current_date = fullDate.split(/T/)[0]
    return current_date
}

export const getAllMeetingsHoursAndCurrentDate = (input_data) =>{
    let parseData = []
    let current_date = ""
    input_data.forEach(object => {
        object.meetings.forEach(meeting=>{
            if(current_date === ""){
                current_date = getCurrentDate(meeting.startTime)
            }
            let startTime = convertISOTimestampToHour(meeting.startTime)
            let endTime = convertISOTimestampToHour(meeting.endTime)
            parseData.push([startTime,endTime])
        })
    })

    const allMeetingsHours = getAllMeetingsHours(parseData)
    return [allMeetingsHours, current_date]
}

export const convertHourToString = (time) =>{
    let hour = (parseInt(time / 60)).toString()
    let minute = (parseInt(time % 60)).toString()

    if (hour.length === 1)
        hour = '0' + hour
    if (minute.length === 1)
        minute = '0' + minute

    return hour + ':' + minute
}

export const convertStringToHour = (hourStr) =>{
    const hour = hourStr.split(':')
    return 60 * parseInt(hour[0])+ parseInt(hour[1])
}

export const fillValueInArrayRange = (arr, value, start, stop) => {
    arr.fill(value, start, stop)
}

const buildISOTimestampObject = (hourTime, year, month, day) => {
    let hour = hourTime.split(":")[0]
    let minute = hourTime.split(":")[1]
    const date =new Date(Date.UTC(year, month, day, hour, minute));
    return date
}

export const convertTimeSlotsToISOTimestamp = (availableSlots, currentDate) =>{
    let availableSlotsIso = []
    const date = currentDate.split("-")
    const year = date[0]
    const month = parseInt(date[1])-1
    const day = parseInt(date[2])

    availableSlots.forEach(slot=>{
        let startTime = buildISOTimestampObject(slot[0], year, month, day)
        let endTime = buildISOTimestampObject(slot[1], year, month, day)

        availableSlotsIso.push({
            startTime, endTime
        })
    })
    
    return availableSlotsIso
}
 export const  isSecondLastElement = (index, array) =>{
    return index+1 === array.length
}