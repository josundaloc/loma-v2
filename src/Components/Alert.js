import React, { Component } from 'react'

export class Alert extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="fixed z-30 w-screen">
        <div
          id="alert"
          hidden={!this.props.visible}
          className="w-full p-2.5 bg-yellow-50"
        >
          <div className="flex flex-row">
            <p className="text-yellow-600 font-bold mx-auto">
              <span className="mr-3">{this.props.message.slice(0, 1)}</span>
              <span>{this.props.message.slice(1)}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Alert
