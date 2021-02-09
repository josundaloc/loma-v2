import React from 'react'

import logo180 from '../assets/logo180.png'
import search from '../assets/search.svg'
import community from '../assets/post.svg'
import collections from '../assets/bookmark.svg'
import fix from '../assets/star.svg'
import user from '../assets/user.svg'

export class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="w-20 lg:w-64 h-full flex flex-col border-r">
        <div className="fixed w-20 lg:w-64 h-full ">
          <a href="/">
            <img
              src={logo180}
              alt="logo"
              className="
                                mx-auto mb-5 mt-2 py-3
                                w-12 
                                lg:w-32 lg:mb-2 
                                block
                            "
            />
          </a>
          <div
            onClick={async () => {
              await this.props.toggleMainDisplay('Landing')
            }}
            className="flex flex-row content-center justify-center lg:justify-start  lg:pl-4 py-3 cursor-pointer"
          >
            <img src={search} className="w-5" />
            <h3 className="hidden lg:block text-xl ml-6 my-auto font-semibold leading-none">
              Find
            </h3>
          </div>

          <div
            onClick={async () => {
              await this.props.toggleMainDisplay('Repairs')
            }}
            className="flex flex-row content-center justify-center lg:justify-start  lg:pl-4 py-3 cursor-pointer"
          >
            <img src={fix} className="w-5" />
            <h3 className="hidden lg:block text-xl ml-6 my-auto font-semibold leading-none">
              Fix
            </h3>
          </div>

          <div
            onClick={async () => {
              await this.props.toggleMainDisplay('Community')
            }}
            className="flex flex-row content-center justify-center lg:justify-start  lg:pl-4 py-3 cursor-pointer"
          >
            <img src={community} className="w-5" />
            <h3 className="hidden lg:block text-xl ml-6 my-auto font-semibold leading-none">
              Community Board
            </h3>
          </div>

          {/* <div 
                onClick={async () => {
                    await this.props.toggleMainDisplay("UserLikes")}}
                className="flex flex-row content-center justify-center lg:justify-start lg:pl-4 py-3 cursor-pointer">
                    <img src={collections} className="w-5"/>
                    <h3 className="hidden lg:block text-xl ml-6 my-auto font-semibold leading-none">Collections</h3>
                </div>

                <div 
                onClick={async () => {
                    await this.props.toggleMainDisplay("UserAccount")}}
                className="flex flex-row content-center justify-center lg:justify-start lg:pl-4 py-3 cursor-pointer">
                    <img src={user} className="w-5"/>
                    <h3 className="hidden lg:block text-xl ml-6 my-auto font-semibold leading-none">Account</h3>
                </div> */}
        </div>
      </div>
    )
  }
}
