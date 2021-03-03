import React from 'react'
import user from '../assets/user.svg'
import menu from '../assets/menu.svg'
import logo180 from '../assets/logo180.png'
import { PopUpSidebar } from './PopUpSidebar'

export class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySidebar: false,
    }
    this.toggleSideBar = this.toggleSideBar.bind(this)
  }

  async toggleSideBar() {
    await this.setState((prevState) => ({
      displaySidebar: !prevState.displaySidebar,
    }))
  }

  render() {
    return (
      <div className="">
        {this.state.displaySidebar ? (
          <PopUpSidebar
            toggleSideBar={this.toggleSideBar}
            toggleMainDisplay={this.props.toggleMainDisplay}
          />
        ) : null}
        <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto">
          <div
            className="sm:hidden
                w-full flex flex-row flex-wrap justify-between items-center
                "
          >
            <img onClick={this.toggleSideBar} className="h-7 pl-3" src={menu} />
            <a href="/">
              <img
                src={logo180}
                alt="logo"
                className="
                            h-12 py-3 
                            block
                        "
              />
            </a>
            <img
              onClick={() => {
                const userAccount = { mainDisplay: 'UserAccount' }
                this.props.changeState(userAccount)
              }}
              className="h-7 pr-3"
              src={user}
            />
          </div>
        </div>
      </div>
    )
  }
}
