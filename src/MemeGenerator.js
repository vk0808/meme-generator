import React from 'react';

export default class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs : []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        this.setState({ allMemeImgs: memes})
      })
  }
  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randomMeme = this.state.allMemeImgs[randomNum].url
    this.setState({
      randomImg: randomMeme
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="meme-form">
          <input type="text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange} 
            placeHolder="Top text here"/>
          <input type="text"
            name="bottomText"
            value={this.state.boyyomText}
            onChange={this.handleChange} 
            placeHolder="Bootom text here"/>
          <button>Generate</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}