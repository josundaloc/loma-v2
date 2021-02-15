import React from 'react'
import depop from '../assets/depop.png'
import ebay from '../assets/ebay.png'
import gumtree from '../assets/gumtree.png'
import facebook from '../assets/facebook.png'
import freecycle from '../assets/Freecycle.png'
import etsy from '../assets/Etsy.png'
import preloved from '../assets/Preloved.png'
import twitter from '../assets/twitter.png'
import instagram from '../assets/instagram.png'
import facebookicon from '../assets/facebookicon.png'
import k20logo from '../assets/k20-logo.png'
import mayorlogo from '../assets/mayorlogo.png'
import lcflogo from '../assets/lcf.svg'

import sketch from '../assets/LOMAsketch.JPG'
import search from '../assets/search.JPG'
import pin from '../assets/pin.JPG'
import community from '../assets/community.JPG'

export class Landing extends React.Component {
  render() {
    return (
      <div className="max-w-screen-md">
        <div
          className="w-full
            flex flex-col justify-center flex-nowrap
            "
        >
          <div className="flex flex-col items-center justify-center sm:w-2/3 p-4 mx-auto opacity-100">
            <h2
              className="
            font-black text-base sm:text-xl md:text-2xl text-center leading-tight
            "
            >
              Buy secondhand, rent and repair
            </h2>
            <h2
              className="
            font-black text-base sm:text-xl md:text-2xl leading-tight text-center -mt-1
            "
            >
              {' '}
              – all in one platform
            </h2>

            <p
              className="
                text-xs sm:text-sm md:text-base text-center mt-2 leading-none
                "
            >
              Find things that you love from all the top sites. Get them
              repaired, refreshed or upgraded just a few clicks away.
            </p>

            <p
              className="
                text-xs sm:text-sm md:text-base text-center mt-2.5
                "
            >
              <span
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0) 65%, #FEF2F2 65%)',
                }}
                className="font-bold text-red-500"
              >
                Get more for your money
              </span>{' '}
              and{' '}
              <span
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0) 65%, #ECFDF5 65%)',
                }}
                className="font-bold text-lime-600"
              >
                Fight product waste
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center sm:flex-wrap flex-nowrap relative">
            <img src={sketch} className="w-full" />
            <div className="hidden flex-col sm:flex-row absolute mx-auto">
              <button className="h-6 text-sm px-1 py-0.5 my-1 text-center bg-red-500 text-white rounded italic font-black shadow mx-auto ">
                Get more for your money
              </button>

              <button className="h-6 text-sm px-1 py-0.5 my-1 text-center bg-lime-500 text-white rounded italic font-black shadow mx-auto sm:ml-5">
                Fight product waste
              </button>
            </div>
          </div>
        </div>

        <div
          className="
                    bg-gray-50
                    flex flex-wrap justify-center
                    p-7 w-full "
        >
          <img src={depop} alt="depop logo" className="h-5 sm:h-8 mb-3 mx-5" />
          <img
            src={facebook}
            alt="facebook logo"
            className="h-5 sm:h-8 mb-3 mx-5"
          />
          <img
            src={gumtree}
            alt="gumtree logo"
            className="h-5 sm:h-8 mb-3 mx-5"
          />
          <img src={ebay} alt="ebay logo" className="h-5 sm:h-8 mb-3 mx-5" />
          <div className="sm:w-full" />
          <img
            src={freecycle}
            alt="freecycle logo"
            className="h-5 sm:h-8 mb-3 mx-5"
          />
          <img src={etsy} alt="etsy logo" className="h-5 sm:h-8 mb-3 mx-5" />
          <img
            src={preloved}
            alt="preloved logo"
            className="h-5 sm:h-8 mb-3 mx-5"
          />
          <p className="text-center text-sm w-full italic">
            ...and more coming!
          </p>
        </div>

        <div
          className="
            w-full
            flex justify-center flex-wrap
        "
        >
          <div
            className="
                FEATURE1
                rounded-lg border border-gray-200 
                h-36 w-80
                mt-4 mx-4 sm:mx-2
                overflow-hidden flex justify-between
            "
          >
            <img
              src={pin}
              alt="community posts"
              className="
                    h-36
                "
            />
            <div
              className="
                    blurb
                    flex flex-col justify-center
                    h-36 w-52"
            >
              <h2 className="leading-tight text-lg font-bold px-2 py-1">
                Collect
              </h2>
              <p className="leading-tight px-2 pb-2 text-sm">
                Pin, save and compare your finds from all the different sites.
              </p>
            </div>
          </div>
          <div
            className="
                FEATURE2
                rounded-lg border border-gray-200 
                h-36 w-80
                mt-4 mx-4 sm:mx-2
                overflow-hidden flex justify-between
            "
          >
            <img
              src={search}
              alt="community posts"
              className="
                    h-36
                "
            />
            <div
              className="
                    blurb
                    flex flex-col justify-center
                    h-36 w-52"
            >
              <h2 className="leading-tight font-bold text-lg px-2 py-1">
                Discover
              </h2>
              <p className="leading-tight text-sm px-2 pb-2">
                Search the entire secondhand universe in one click.
              </p>
            </div>
          </div>
          <div
            className="
                FEATURE3
                rounded-lg border border-gray-200 
                h-36 w-80
                my-4 mx-4 sm:mx-2
                overflow-hidden flex justify-between
            "
          >
            <img
              src={community}
              alt="community posts"
              className="
                    h-36
                "
            />
            <div
              className="
                    blurb
                    flex flex-col justify-center
                    h-36 w-52
                    "
            >
              <h2 className="leading-tight font-bold px-2 py-1 text-lg">
                Connect
              </h2>
              <p className="leading-tight px-2 pb-2 text-sm">
                Get suggestions and offers from a community of secondhand
                shoppers.
              </p>
            </div>
          </div>
        </div>
        <div
          className="BackedBy
        w-full bg-gray-50 p-5"
        >
          <h1 className="text-lg font-black text-gray-700 text-center">
            Backed by:
          </h1>
          <div className="w-full flex flex-row flex-wrap justify-center content-center items-center">
            <img
              onClick={() => {
                window.open('https://www.kings20.com/ventures/loma/')
              }}
              className="h-36 opacity-70 p-4 hover"
              src={k20logo}
            />
            <img className="h-36 opacity-70 p-4" src={lcflogo} />
            <div className="w-60 h-36 flex flex-col justify-center items-center content-center">
              <img className="w-full opacity-80" src={mayorlogo} />
              <p className="text-center text-sm leading-none text-gray-400 mt-2">
                Environment Award finalist 2020
              </p>
            </div>
          </div>
        </div>
        <div
          className="FOOTER
        h-32 flex justify-between sm:justify-center items-center
        bg-white
        "
        >
          <p className=" text-xs text-gray-400 pl-5 pr-6">
            © 2020 LoopMarket Ltd.
          </p>
          <div className="flex flex-wrap justify-end items-center">
            <a
              href="mailto:heyjoseph@asklomafirst.com"
              className="text-xs leading-none rounded border border-gray-300 font-bold text-gray-400 w-16 p-2 mx-4 my-2 text-center"
            >
              E-mail
            </a>

            <div className="flex flex-row mx-2">
              <a
                href="https://instagram.com/asklomafirst"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={instagram}
                  alt="instagram icon"
                  className="h-6 pr-2"
                />
              </a>
              <a
                href="https://twitter.com/asklomafirst"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitter} alt="instagram icon" className="h-6 pr-2" />
              </a>
              <a
                href="https://facebook.com/asklomafirst"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={facebookicon}
                  alt="instagram icon"
                  className="h-6 pr-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
