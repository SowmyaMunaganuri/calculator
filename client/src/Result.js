import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KeyPad from './KeyPad'

class Result extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    result: "",
    myexpression:""
}


onClick = button => {

if(button === "="){
    this.calculate()
}

else if(button === "C"){
    this.reset()
}
else if(button === "CE"){
    this.backspace()
}

else {
    this.setState({
        result: this.state.result + button
    })
}

};

onSubmit=e=>{
          e.preventDefault()
          this.props.onSubmitMessage(this.state.myexpression)
          this.setState({ myexpression: '',
        result:'' })
}


calculate = () => {
try {
    this.setState({
        // eslint-disable-next-line
       myexpression:this.state.result+"="+eval(this.state.result),
       result: (eval(this.state.result))
    })
    
    
} catch (e) {
    this.setState({
        result: "error"
    })

}
};

reset = () => {
this.setState({
    result: ""
})
};

backspace = () => {
this.setState({
    result: this.state.result.toString().slice(0, -1)
})
};
  render() {
    return (
      <div>
      <h1>Simple Calculator</h1>
          <KeyPad onClick={this.onClick}/>
            <div className="result">
                <p>{this.state.result}</p>
                <p>{this.state.myexpression}</p>
            </div>
        <input type="submit" value={'Send'} onClick={e=>this.onSubmit(e)}/>
        </div>
    )
  }
}
export default Result