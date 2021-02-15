import React from 'react'
import { Listing } from './Listing'
import grid from '../assets/grid.svg'
import filter from '../assets/filter.svg'
import sort from '../assets/sort.svg'
import { LoadingPop } from './LoadingPop'

const thatsAll = (
  <div
    id="thatsAll"
    className="h-64 w-full flex flex-col justify-center items-center m-40"
  >
    <div
      className="
            bg-blue-50 m-3 h-52 w-52 rounded-full flex flex-col justify-center content-center"
    >
      <h3 className="text-7xl mb-1 text-center">🤐</h3>
      <p className="p-3 text-center italic text-sm text-blue-700">
        That's it -- for now.
      </p>
    </div>
  </div>
)
export class Results extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      Loading: true,
      thatsAll: false,
    }
    this.toggleResults = this.toggleResults.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ Loading: false })
    }, 500)

    setTimeout(() => {
      this.setState({ thatsAll: true })
    }, 2000)
  }

  toggleResults() {
    console.log(`${document.getElementById('sort').value} selected`)
    this.props.reOrderDisplay(document.getElementById('sort').value)
  }

  render() {
    return (
      <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto">
        <div
          onClick={this.props.toggleSearchSettings}
          className="
            cursor-pointer
            w-full bg-gray-50 flex flex-row flex-wrap justify-center
            "
        >
          <div
            className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"
          >
            <img className="h-3 mr-1 my-auto" src={grid}></img>
            {this.props.gridView}
          </div>

          <div
            className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"
          >
            <img className="h-3 mr-1 my-auto" src={sort}></img>
            {this.props.resultsDisplay}
          </div>

          <div
            className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"
          >
            <img className="h-3 mr-1 my-auto" src={filter}></img>Filter
          </div>
        </div>
        {this.state.Loading === true ? <LoadingPop /> : null}

        {this.state.Loading === false ? (
          <div
            className="results p-1 max-w-screen-md
                    w-full flex flex-wrap justify-center"
          >
            {this.props.Data.map((listing) => {
              return (
                <Listing
                  togglePopUp={this.props.togglePopUp}
                  gridView={this.props.gridView}
                  listing={listing}
                />
              )
            })}

            {this.state.thatsAll === true ? thatsAll : null}
          </div>
        ) : null}
      </div>
    )
  }
}
