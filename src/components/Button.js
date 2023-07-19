import '../App.css'

function Button(props) {
    let {onClick} = props
  return (
    <button className="hero-btn" onClick={onClick}>
        Shop now
    </button>
  )
}

export default Button