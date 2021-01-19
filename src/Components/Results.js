import React from 'react';
//import './Results.css';
import { Listing } from './Listing';
import grid from '../assets/grid.svg';

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
        <div className="">
            <div
            className="
            w-full bg-red-100 flex flex-row my-2
            ">
            <button
            className=" flex flex-row
            bg-gray-100 text-gray-500 rounded-md p-2 mx-1.5 leading-none align-middle px
            text-xs"><img className="h-4 mr-1 my-auto" src={grid}></img>Images + Description</button>

            <button
            className=" flex flex-row
            bg-gray-100 text-gray-500 font-bold rounded-md p-2
            text-xs"><img className="h-4 mr-1" src={grid}></img>Images + Description</button>

            <button
            className=" flex flex-row
            bg-gray-100 text-gray-500 font-bold rounded-md p-2
            text-xs"><img className="h-4 mr-1" src={grid}></img>Images + Description</button>
            </div>

            <div className="results
                    w-full flex flex-wrap justify-center">
                    
                    {this.props.Data.map(
                        (listing) => {
                            return <Listing togglePopUp={this.props.togglePopUp} listing={listing}/>
                        }
                    )}
            </div>
            
        </div>


        )
    }
}