import React from 'react';
import { Listing } from './Listing';
import grid from '../assets/grid.svg';
import filter from '../assets/filter.svg';
import sort from '../assets/sort.svg';
export class Results extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.toggleResults = this.toggleResults.bind(this);
    }

    toggleResults() {
        console.log(`${document.getElementById("sort").value} selected`)
        this.props.reOrderDisplay(document.getElementById("sort").value);
    }

    render() {
        return (
        <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto">
            <div
            onClick={this.props.toggleSearchSettings}
            className="
            cursor-pointer
            w-full bg-gray-50 flex flex-row flex-wrap justify-center
            ">
                <div
                className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"><img className="h-3 mr-1 my-auto" src={grid}></img>{this.props.gridView}
                </div>

                <div
                className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"><img className="h-3 mr-1 my-auto" src={sort}></img>{this.props.resultsDisplay}
                </div>

                <div
                className=" flex flex-row
                bg-gray-50 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle py-auto
                text-xs"><img className="h-3 mr-1 my-auto" src={filter}></img>Filter
                </div>

            </div>

            <div className="results p-1 max-w-screen-md
                    w-full flex flex-wrap justify-center">
                    
                    {this.props.Data.map(
                        (listing) => {
                            return <Listing togglePopUp={this.props.togglePopUp} gridView={this.props.gridView} listing={listing}/>
                        }
                    )}
            </div>
            
        </div>


        )
    }
}