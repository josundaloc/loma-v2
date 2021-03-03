import React from 'react'
import { Listing } from './Listing'
import grid from '../assets/grid.svg'
import filter from '../assets/filter.svg'
import sort from '../assets/sort.svg'
import { TopNav } from './TopNav'
import sojo from '../assets/sojo.svg'

export class Repairs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto lg:pt-6">
        <h1
          className="font-black text-2xl px-3 mt-3
            "
        >
          Fix
        </h1>
        <p className="px-3 italic text-sm text-gray-500">
          Book repair, refurbish or upgrade services here:
        </p>

        <div className="">
          <button className="font-bold bg-blue-50 text-blue-600 p-1 px-2.5 mx-3 mt-5 rounded">
            Clothing
          </button>

          <div className="w-full flex flex-row bg-gray-50 mt-2 ">
            <div
              onClick={() => {
                window.open('https://apps.apple.com/gb/app/sojo/id1542002553')
              }}
              className="w-44 h-60 border m-3 rounded-md"
            >
              <img src={sojo} className="w-full rounded-t" />
              <div className="p-2">
                <h1 className="font-bold">Sojo</h1>
                <p className="italic text-gray-600 text-xs">
                  Think 'Deliveroo' but for alterations. 🚲
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                window.open('https://apps.apple.com/gb/app/sojo/id1542002553')
              }}
              className="hidden w-44 h-60 border my-3 mx-1.5 rounded-md"
            >
              <img src={sojo} className="w-full rounded-t" />
              <div className="p-2">
                <h1 className="font-bold">Sojo</h1>
                <p className="italic text-gray-600 text-xs">
                  Think 'Deliveroo' but for alterations. 🚲
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 w-full h-20 flex flex-col justify-center items-center mt-10 bg-gray-50">
          <text className="text-xl font-bold italic text-gray-700">
            More services coming soon.
          </text>
          <p className="text-sm text-gray-500 italic">
            If you'd like to be one of them. Get in touch via our email below.
          </p>
        </div>
      </div>
    )
  }
}
