import React, { Component } from 'react'
import Result from './Result'
import Expression from './Expression'

const URL = 'ws://localhost:3001'

class Main extends Component {
  state = {
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = expressionString => {
    const message = { message: expressionString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() 
  {
        return (
      <div>
        
        <Result
          ws={this.ws}
          onSubmitMessage={expressionString => this.submitMessage(expressionString)}
        />
        
        {this.state.messages.map((expression, index) =>
          <Expression
            key={index}
            expression={expression.message}
          />,
        )}
      </div>
    )
  }
}

export default Main