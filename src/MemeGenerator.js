import React from 'react';
import { saveAs } from 'file-saver';

class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/30b1gx.jpg',
      templateId: '181913649',
      allMemeImgs : [],
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSkip = this.handleSkip.bind(this)
    this.generateMeme = this.generateMeme.bind(this)
    this.handleSave = this.handleSave.bind(this)
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
  handleSkip(event) {
    event.preventDefault()
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    console.log(this.state.allMemeImgs[randomNum].box_count)
    this.state.allMemeImgs[randomNum].box_count === 2 
      ?
      this.setState({
        randomImg: this.state.allMemeImgs[randomNum].url,
        templateId: this.state.allMemeImgs[randomNum].id
      })
      :
      this.setState({
        randomImg: this.state.randomImg,
        templateId: this.state.templateId
      })
  }
  generateMeme(event) {
    event.preventDefault();
    const currentMeme = this.state.templateId;
    const formData = new FormData();
    formData.append('username', 'joe9193')
    formData.append('password', 'Joe@123_bye')
    formData.append('template_id', currentMeme)
    formData.append('text0', this.state.topText);
    formData.append('text1', this.state.bottomText);

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(res => {
      res.json().then(res => {
        this.setState({url : res.data.url, randomImg: res.data.url})
      })
    })
  }
  handleSave(event) {
    event.preventDefault();
    this.state.url.length > 0 && saveAs(this.state.url, "meme_vk0808.jpg")
  }
  render() {
    return (
      <div>
        <form className="meme-form">
          <input type="text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange} 
            placeholder=" Top text here"/>
          <input type="text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange} 
            placeholder=" Bottom text here"/>
          <button onClick={this.handleSkip}>Skip</button>
          <button onClick={this.generateMeme}>Generate</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="Meme" />
          <button onClick={this.handleSave}>Download</button>
        </div>
      </div>
    )
  }
}

export default MemeGenerator;