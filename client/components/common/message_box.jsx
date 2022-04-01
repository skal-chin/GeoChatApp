export const MessageBox = ({contents, userName}) => {
  return (
    <div className="message-box">
      {contents}
      <h3>{ userName }</h3>
    </div>
  )
}