export const Day = (props) => {
  const { date } = props
  return (
    <div className="day">
      {date.toDateString()}
    </div>
  )
}