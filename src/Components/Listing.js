import React from 'react'
import 'tailwindcss/tailwind.css'
import depop from '../assets/depop.png'
import ebay from '../assets/ebay.png'
import gumtree from '../assets/gumtree.png'
import facebook from '../assets/facebook.png'
import imagePlaceholder from '../assets/gallery.png'
import etsy from '../assets/Etsy.png'
import trashnothing from '../assets/Freecycle.png'

import heart from '../assets/heart.svg'
//import './Listing.css';

const truncate100 = (input) =>
  input.length > 100 ? `${input.substring(0, 100)}...` : input
const truncate55 = (input) =>
  input.length > 55 ? `${input.substring(0, 55)}...` : input

export class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.openWindow = this.openWindow.bind(this)
    this.logo = this.logo.bind(this)
    this.togglePopUp = this.togglePopUp.bind(this)
  }

  logo() {
    if (this.props.listing.site === 'ebay') {
      return ebay
    } else if (this.props.listing.site === 'depop') {
      return depop
    } else if (this.props.listing.site === 'gumtree') {
      return gumtree
    } else if (this.props.listing.site === 'facebook') {
      return facebook
    } else if (this.props.listing.site === 'etsy') {
      return etsy
    } else if (this.props.listing.site === 'trashnothing') {
      return trashnothing
    } else {
      return
    }
  }

  openWindow() {
    window.open(this.props.listing.url)
  }

  togglePopUp() {
    this.props.togglePopUp(this.props.listing)
  }

  render() {
    return (
      // LISTING ITSELF
      <div
        onClick={this.togglePopUp}
        className="
            cursor-pointer
            w-1/2 sm:w-1/3
            "
      >
        <div
          className="
                py-0.5 px-0.5 ipx:py-1 ipx:px-1
                w-full h-full rounded-lg
                "
        >
          <img
            src={heart}
            className="
                    -mb-6 mr-1 pt-1
                    float-right h-6"
            style={{
              filter: 'drop-shadow(1px 1px 1px #8E8E91)',
              webkitFilter: 'drop-shadow(1px 1px 1px #8E8E91)',
            }}
          />

          <img
            src={
              this.props.listing.image
                ? this.props.listing.image
                : imagePlaceholder
            }
            className="
                    bg-gray-50
                    h-40 psm:h-60 w-full object-cover shadow mb-2.5
                    rounded-lg"
          />

          <div
            className="w-full rounded
                    "
          >
            {this.props.gridView === 'Image + Description' ? (
              <p
                className=" overflow-ellipsis leading-tight
                           text-sm font-bold text-gray-600 mb-2
                           p-0 m-0 break-words
                           "
              >
                {truncate55(this.props.listing.title)}
              </p>
            ) : null}

            <div
              className="
                            flex flex-row justify-start items-center mb-1
                            "
            >
              <p
                className="
                                h-4
                                px-1 mr-1.5 rounded-sm shadow
                                font-bold text-xs text-lime-600
                                bg-lime-50 text-center
                                flex-grow-0"
              >
                {this.props.listing.price
                  ? `£${this.props.listing.price}`
                  : `FREE`}
              </p>

              <div
                className="h-4 flex flex-col justify-center px-1.5 py-0.5
                            bg-white rounded-sm shadow"
              >
                <img
                  className="
                            h-full
                            flex-none 
                            "
                  src={this.logo()}
                  alt={this.props.listing.site}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
