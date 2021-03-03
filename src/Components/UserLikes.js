import React from 'react'
import { Favourite } from './Favourite'
import grid from '../assets/grid.svg'
import filter from '../assets/filter.svg'
import sort from '../assets/sort.svg'
import { TopNav } from './TopNav'

import { getFavourites } from '../feature/favourites'

export class UserLikes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto lg:pt-6">
        <h1
          className="font-black text-2xl px-3 py-2
            "
        >
          Liked Posts:
        </h1>
        <div
          className="p-1 results max-w-screen-md
          w-full flex flex-wrap justify-start"
        >
          {this.props.favourites.map((listing) => {
            return (
              <Favourite
                togglePopUp={this.props.togglePopUp}
                gridView={this.props.gridView}
                listing={listing}
                removeFavourite={this.props.removeFavourite}
              />
            )
          })}
          <div
            hidden={this.props.signedIn}
            className="bg-yellow-50 border-white rounded-lg px-3 py-1.5 mt-3 mx-auto"
          >
            <h1 className="font-bold w-full mx-auto text-yellow-700">
              Hello stranger!
            </h1>
            <p className="my-1  text-xs leading-tight text-yellow-700">
              Sign up so you can start liking and comparing listings from across
              secondhand platforms
            </p>
          </div>

          <div
            hidden={
              this.props.signedIn === true && this.props.favourites.length === 0
                ? false
                : true
            }
            className="bg-yellow-50 rounded-lg border-white px-3 py-1.5 mt-3 mx-auto"
          >
            <h1 className="font-bold w-full mx-auto text-yellow-700">
              Your saved likes go here! 👇
            </h1>
            <p className="my-1  text-xs leading-tight text-yellow-700">
              Make your first search and click the heart icon ❤️
            </p>
          </div>
        </div>
      </div>
    )
  }
}
