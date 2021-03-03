import React from 'react'
import { TopNav } from './TopNav'

export class Community extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto lg:pt-6">
        <h1
          className="font-black text-2xl px-3 py-0.5
            "
        >
          Community
        </h1>
        <div
          className="results p-1 max-w-screen-md h-screen
                    w-full flex flex-col flex-wrap justify-center content-center items-center"
        >
          <div
            className="
                        bg-blue-50 -mt-64 h-52 w-52 rounded-full flex flex-col justify-center content-center mb-8"
          >
            <h3 className="text-7xl mb-1 text-center">🤝</h3>
            <p className="p-3 text-center italic text-sm text-blue-700">
              Coming soon.
            </p>
          </div>
          <div className="bg-gray-50 w-full h-60 rounded-lg p-4 hidden">
            <p className="italic text-gray-500"></p>
          </div>
        </div>
      </div>
    )
  }
}
