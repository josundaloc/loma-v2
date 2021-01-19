import React from 'react';
import "tailwindcss/tailwind.css"
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

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
    constructor(props) {
        super(props);
        this.state = {
            value: { min: 200, max: 600 },
          };
    }
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
                    fixed z-40 rounded-l-lg right-0 p-1.5 px-2
                    bg-white w-64 h-full"
                    >

                        <div
                        className="
                        flex flex-row justify-between p-1"
                        >
                            <h3 className="
                            font-bold text-lg
                                ">Search Settings</h3>

                            <button
                            className="
                            h-6 w-6 rounded bg-red-200
                            ">
                                <p className="transform rotate-45 text-center mx-auto my-auto text-red-700 font-black">+</p>
                            </button>

                        </div>

                        <div
                        className="
                        flex flex-row justify-center 
                        "
                        >
                            <input 
                            type="text"
                            placeholder="placeholder placeholder placeholder "
                            className="
                            text-center text-sm
                            overflow-hidden
                            border my-1 rounded-md p-1
                            h-8 w-full"></input>
                        </div>
                        
                        <div
                        className="my-1.5
                        flex flex-row justify-between">
                            <h3
                            className="
                            text-gray-600
                            font-bold p-1">Grid view:</h3>

                            <select className="
                            border rounded text-center
                            w-32 text-gray-600
                            m-1 text-xs">
                                <option>Images only</option>
                                <option>Images + Description</option>
                                <option>Detailed</option>
                            </select>

                        </div>

                        <div
                        className="
                        flex flex-row justify-between my-1.5">
                            <h3
                            className="
                            text-gray-600
                            font-bold p-1">Sort:</h3>

                            <select className="
                            border rounded text-center w-32 text-gray-600
                            m-1 text-xs">
                                <option>Trending</option>
                                <option>Lowest first</option>
                                <option>Highest first</option>
                            </select>

                        </div>

                        <div
                        className="my-1.5
                        flex flex-row flex-wrap">
                            <h3
                            className="
                            text-gray-600
                            font-bold p-1">Price range:</h3>

                            <div className="w-full m-4 p-1">

                            <InputRange
                                    maxValue={1000}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })} />

                            </div>
                            
                        </div>
                        <div className="">
                            <h3
                            className="
                            text-gray-600
                            font-bold p-1">Sites:</h3>

                            <div className="w-full p-1 mb-8">
                                <div className="h-9 w-full  flex flex-row">
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        "src={ebay}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        "src={depop}></img>
                                    </div>
                                </div>
                                <div className="h-9 w-full flex flex-row">
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        "src={gumtree}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="w-3/4 ml-2 my-auto
                                        "src={facebook}></img>
                                    </div>
                                </div>
                                <div className="h-9 w-full flex flex-row">
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        
                                        "src={etsy}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="ml-2 my-auto w-3/4
                                        "src={trashnothing}></img>
                                    </div>
                                </div>
                                
                            </div>


                        </div>

                        <div
                        className="flex flex-row justify-center">
                            <button
                            className="
                            bg-blue-100 rounded py-1.5 px-3">
                                <p className="
                                font-bold text-blue-700">Save</p>
                            </button>
                        </div>

                    </div>



                </div>
            )
        } 

    }