import * as CONSTANTS from './constants.js'
import * as utils from './utils.js'

const setUnavailableTime = (meetings, freeTime, step) => {
    meetings.forEach(meet=>{
        utils.fillValueInArrayRange(freeTime, 
                            false,
                            parseInt(meet[0]/step), 
                            parseInt(meet[1]/step))
    })
}

export const getAvailableSlots = (meetings, inteval) =>{ 
    let freeTime = Array(inteval-1).fill(true)
    const step = parseInt(CONSTANTS.MINTUTES_IN_DAY / inteval)
    setUnavailableTime(meetings, freeTime, step)

    let result = []
    let openInterval = false
    let startMeeting =0, endMeeting=0

    for(let i=0; i < freeTime.length ; i++){
        if(!openInterval && freeTime[i]){
            openInterval = true
            startMeeting = i
        } else if(openInterval && !freeTime[i]){
            openInterval = false
            endMeeting = i
            startMeeting = utils.convertHourToString(startMeeting * step)
            endMeeting = utils.convertHourToString(endMeeting * step)
            result.push([startMeeting, endMeeting])
        } 
        else if(utils.isSecondLastElement(i,freeTime)){
            if(freeTime[i+1] !== true){
                freeTime[i+1] = false 
            }
        }
    }
    
    return result
}