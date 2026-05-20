import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

export default class DateService {
  getUtcDate = ({ date }) => {
    return dayjs(date).utc()
  }
}
