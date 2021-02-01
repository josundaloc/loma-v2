import React from 'react';
import { Listing } from './Listing';
import grid from '../assets/grid.svg';
import filter from '../assets/filter.svg';
import sort from '../assets/sort.svg';
import { TopNav } from './TopNav';

export class Community extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
        <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto px-3 lg:pt-6">
            <div><TopNav toggleMainDisplay={this.props.toggleMainDisplay}/></div>
            <h1 className="font-bold text-xl
            ">Community:</h1>
            <div className="results p-1 max-w-screen-md h-screen
                    w-full flex flex-col flex-wrap justify-center content-center">
                        <div className="
                        bg-blue-50 -mt-32 h-52 w-52 rounded-full flex flex-col justify-center content-center">
                        <h3 className="text-7xl mb-1 text-center">🤝</h3>
                            <p className="p-3 text-center italic text-sm text-blue-700">You can book repair services here.</p>
                        </div>
                       
                    
            </div>
            
        </div>


        )
    }
}