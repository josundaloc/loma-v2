import React from 'react';
import "tailwindcss/tailwind.css"
import depop from '../assets/depop.png';
import ebay from '../assets/ebay.png';
import gumtree from '../assets/gumtree.png';
import facebook from '../assets/facebook.png';
import imagePlaceholder from '../assets/gallery.png'; 
import etsy from '../assets/Etsy.png'; 
import trashnothing from '../assets/Freecycle.png';

import heart from '../assets/heart.png';
import dummyImage from '../assets/dummyimage.jpg';
import link from '../assets/link.png';
import bookmark from '../assets/bookmark.png';
import next from '../assets/next.svg';
//import './Listing.css';

export class PopUpSearchSettings extends React.Component {
    render() {
            return (
                <div 
                className=""
                >
                    <div 
                    className="
                    bg-coolGray-800 bg-opacity-80 h-full w-full fixed 
                    z-30">                        
                    </div>

                    <div
                    className="
                    fixed z-40 rounded-l-lg right-0
                    bg-white w-3/4 h-2/3"
                    >

                        <div
                        className="
                        flex flex-row justify-between p-1
                        bg-green-100"
                        >
                            <h3 className="
                            font-bold text-lg
                                ">Search Settings</h3>

                            <button
                            className="
                            bg-red-200 h-6 w-6 rounded 
                            ">
                                <p className="transform rotate-45 text-center mx-auto my-auto text-red-700 font-black">+</p>
                            </button>

                        </div>

                        <div
                        className="
                        bg-red-200 flex flex-row justify-center
                        "
                        >
                            <input 
                            type="text"
                            placeholder="placeholder placeholder placeholder "
                            className="
                            text-center text-sm
                            overflow-hidden
                            border m-1 rounded p-1
                            h-8 w-full"></input>
                        </div>
                        <div
                        className="
                        bg-blue-200 flex flex-row justify-between">
                            <h3
                            className="
                            font-bold p-1">Grid view:</h3>

                            <select className="m-1">
                                <option>Yes</option>
                            </select>

                        </div>

                    </div>



                </div>
            )
        } 

    }