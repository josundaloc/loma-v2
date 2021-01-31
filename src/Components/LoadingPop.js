import React from 'react';
import loading from '../assets/loading.gif'
import { SkeletonListing } from './SkeletonListing'

// const texts = ["websites", "illustrations", "pancakes"];
// let count = 0;
// let index = 0;
// let currentText = " ";
// let letter = "";

// function type() {
//     if (count === texts.length) {
//         count = 0;
//     }
//     currentText = texts[count];
//     letter = currentText.slice(0, ++index);

//     document.getElementById("input").placeholder = letter;
    
//     if (letter.length === currentText.length) {
//         count++;
//         index = 0
//     }
// }

// function changeText() {
//     document.getElementById("text").innerHTML = "waiting on eBay";
    
// };


export class LoadingPop extends React.Component {
    render() {
        return (
            <div className="w-full flex flex-wrap justify-center p-1">
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                <SkeletonListing />
                
            </div>
            
            
        )
    }
}