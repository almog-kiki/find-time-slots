import * as CONSTANTS from './lib/constants.js'
import * as utils from './lib/utils.js'
import * as algorithm from './lib/algorithm.js'

const main =()=>{

    const input = utils.getAllMeetingsHoursAndCurrentDate(CONSTANTS.INPUT_DATA)
    const allMeetingsHours = input[0]
    const currentDate =  input[1]
    let availableTimeSlots = algorithm.getAvailableSlots(allMeetingsHours,CONSTANTS.TIME_INTERVAL)
    const result = utils.convertTimeSlotsToISOTimestamp(availableTimeSlots, currentDate)
    
    console.log(result)
}

main()