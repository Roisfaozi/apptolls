export default function formatDate(time: string): string {
  let dates = new Date(time)
  let hours = dates.getHours()
  let minutes: any = dates.getMinutes()
  let second: any = dates.getSeconds()
  let meridian = 'AM'
  let hour: any = hours

  if (hour >= 12) {
    hour = hours - 12
    meridian = 'PM'
  }

  if (hour == 0) {
    hour = 12
  }

  minutes = minutes < 10 ? '0' + minutes : minutes
  second = second < 10 ? '0' + second : second
  hour = hour < 10 ? '0' + hour : hour
  const clock = hour + ':' + minutes + ' ' + meridian
  console.log(clock)
  return clock
}
