import React from 'react';
import { Listing } from './Listing';
import grid from '../assets/grid.svg';
import filter from '../assets/filter.svg';
import sort from '../assets/sort.svg';

export class UserLikes extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
        <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto">
            <h1 className="font-bold text-xl
            ">Liked posts:</h1>
            <div className="results p-1 max-w-screen-md
                    w-full flex flex-wrap justify-center">
                    
            </div>
            
        </div>


        )
    }
}