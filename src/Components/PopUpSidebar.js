import React from 'react'

import logo180 from '../assets/logo180.png'
import search from '../assets/search.svg'
import community from '../assets/post.svg'
import collections from '../assets/bookmark.svg'
import fix from '../assets/star.svg'
import user from '../assets/user.svg'

export class PopUpSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMainDisplay = this.toggleMainDisplay.bind(this)
  }

  async toggleMainDisplay(newDisplay) {
    this.props.toggleMainDisplay(newDisplay)
  }

  render() {
    return (
      <div>
        <div
          onClick={this.props.toggleSideBar}
          className="bg-coolGray-800 bg-opacity-80 h-screen w-screen fixed z-30"
        >
          <div className="bg-white h-full w-64 rounded-r-lg flex flex-col justify-start content-start">
            <a href="/">
              <img
                src={logo180}
                alt="logo"
                className="
                                    ml-14 mb-2 mt-2 py-3
                                    w-24
                                    block
                                "
              />
            </a>
            <div
              onClick={async () => {
                await this.props.toggleSideBar
                await this.toggleMainDisplay('Landing')
              }}
              className="
                    flex flex-row h-10 pl-3
                    cursor-pointer"
            >
              <img src={search} className="w-4 " />
              <h3 className="ml-6 text-lg align-middle my-auto font-semibold leading-none">
                Find
              </h3>
            </div>

            <div
              onClick={async () => {
                await this.props.toggleSideBar
                await this.toggleMainDisplay('Repairs')
              }}
              className="
                    flex flex-row h-10 ml-3
                    cursor-pointer"
            >
              <img src={fix} className="w-4 " />
              <h3 className="ml-6 text-lg align-middle my-auto font-semibold leading-none">
                Fix
              </h3>
              {/* <p className="text-xs text-gray-500 italic">get</p> */}
            </div>

            <div
              onClick={async () => {
                await this.props.toggleSideBar
                await this.toggleMainDisplay('Community')
              }}
              className="
                    flex flex-row h-10 ml-3
                    cursor-pointer"
            >
              <img src={community} className="w-4 " />
              <h3 className="ml-6 text-lg align-middle my-auto font-semibold leading-none">
                Community Board
              </h3>
            </div>

            <div
              onClick={async () => {
                await this.props.toggleSideBar
                await this.toggleMainDisplay('UserLikes')
              }}
              className="
                    flex flex-row h-10 ml-3
                    cursor-pointer"
            >
              <img src={collections} className="w-4 " />
              <h3 className="ml-6 text-lg align-middle my-auto font-semibold leading-none">
                Saved items
              </h3>
            </div>

            <div
              onClick={async () => {
                await this.props.toggleSideBar
                await this.toggleMainDisplay('UserAccount')
              }}
              className="
                    flex flex-row h-10 ml-3
                    cursor-pointer"
            >
              <img src={user} className="w-4 " />
              <h3 className="ml-6 text-lg align-middle my-auto font-semibold leading-none">
                Account
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
