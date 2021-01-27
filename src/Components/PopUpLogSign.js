import React from 'react';
import "tailwindcss/tailwind.css"
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

import depop from '../assets/depop.png';
import ebay from '../assets/ebay.png';
import gumtree from '../assets/gumtree.png';
import facebook from '../assets/facebook.png';
import etsy from '../assets/Etsy.png'; 
import trashnothing from '../assets/Freecycle.png';

//import './Listing.css';


export class PopUpLogSign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null //Sign Up / Log In/ My Account / null
        }
    }
    render() {
            if (this.state.mode === "Sign Up") {
                return (
                    <div>
                        <div 
                        className=" bg-coolGray-700 bg-opacity-90 h-full w-full fixed 
                        z-30 flex flex-row justify-center"
                        >
    
                        <div className="
                        fixed z-40 shadow-2xl
                        bg-white rounded-lg
                        top-1/6
                        w-64
                        overflow-hidden
                        flex flex-col
                        "
                        >
                            <h1 className="
                            font-extrabold tracking-tight text-2xl mx-auto py-2 text-gray-800  
                            ">Sign Up</h1>
                                <p className=" 
                                text-xxs mx-auto mb-1"
                                >Already have an account? <span className="text-green-500">Log in</span></p>
                                
                                <p className=" text-8xl my-2 mx-auto">🚀</p>
    
                                <div className=" 
                                px-3.5
                                ">
                                    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Username<span className="text-xxs text-red-400 font-normal"> That's already taken 😬</span></p>
    
                                    <div className="flex flex-row">
                                    <p className="my-auto mr-1.5 text-sm text-gray-400">@</p>
    
                                    <input 
                                    type="text"
                                    placeholder=""
                                    className=" 
                                    bg-blue-50 border border-blue-100 
                                    text-left text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
    
                                    </div>
                                    
    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">E-mail <span className="text-xxs text-red-400 font-normal"> Enter a valid email</span></p>
    
                                    <input 
                                    type="text"
                                    placeholder=""
                                    className=" 
                                    bg-blue-50 border border-blue-100
                                    text-xs text-left text-gray-600
                                    overflow-hidden align-right
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Password 
                                    <span className="text-xxs text-red-400 font-normal"> Must be more than 6 characters</span></p>
    
                                    <input 
                                    type="password"
                                    placeholder=""
                                    className=" 
                                    bg-blue-50 border border-blue-100
                                    text-center text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
                                    
                                </div>
    
                                <button 
                                className=" 
                                p-1 w-20 rounded-md my-5
                                text-white font-bold text-sm mx-auto
                                bg-lime-500 active:bg-lime-600">
                                Sign Up
                                </button>
    
                        </div>
                    
    
                    </div>
    
                    </div>
    
                )
            } else if (this.state.mode === "Log In") {
                return (
                    <div>
                        <div 
                        className=" bg-coolGray-700 bg-opacity-90 h-full w-full fixed 
                        z-30 flex flex-row justify-center"
                        >
    
                        <div className="
                        fixed z-40 shadow-2xl
                        bg-white rounded-lg
                        top-1/6
                        w-64
                        overflow-hidden
                        flex flex-col
                        "
                        >
                            <h1 className="
                            font-extrabold tracking-tight text-2xl mx-auto py-2 text-gray-800  
                            ">Log in</h1>
                                <p className=" 
                                text-xxs mx-auto mb-1"
                                >New to Loma? <span className="text-green-500">Sign up</span></p>
                                
                                <p className=" text-8xl m-2 mt-3.5 mx-auto">👋</p>
    
                                <div className=" 
                                px-3.5
                                ">
                                    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Username</p>
    
                                    <div className="flex flex-row">
                                    <p className="my-auto mr-1.5 text-sm text-gray-400">@</p>
    
                                    <input 
                                    type="text"
                                    placeholder=""
                                    className=" 
                                    bg-blue-50 border border-blue-100 
                                    text-left text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
    
                                    </div>
    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Password 
                                    </p>
    
                                    <input 
                                    type="password"
                                    placeholder=""
                                    className=" 
                                    bg-blue-50 border border-blue-100
                                    text-center text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>

                                    <p className="text-xs text text-red-500 text-center tracking-tight mt-3 font-semibold">Incorrect username or password.</p>
                                    
                                </div>
    
                                <button 
                                className=" 
                                p-1 w-20 rounded-md my-5
                                text-white font-bold text-sm mx-auto
                                bg-lime-500 active:bg-lime-600">
                                Log in
                                </button>
    
                        </div>
                    
    
                    </div>
    
                    </div>
    
                )
            } else if (this.state.mode === "My Account") {
                return (
                    <div>
                        <div 
                        className=" bg-coolGray-700 bg-opacity-90 h-full w-full fixed 
                        z-30 flex flex-row justify-center"
                        >
    
                        <div className="
                        fixed z-40 shadow-2xl
                        bg-white rounded-lg
                        top-1/6
                        w-64
                        overflow-hidden
                        flex flex-col
                        "
                        >
                            <h1 className="
                            font-extrabold tracking-tight text-2xl mx-auto py-2 text-gray-800  
                            ">My Account</h1>
                                
                                <p className="text-7xl align-middle text-center mb-3 mx-auto bg-yellow-100 rounded-full">🌱</p>
    
                                <div className=" 
                                px-3.5
                                ">
                                    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Username<span className=" text-xxs text-red-400 font-normal"> That's already taken 😬</span></p>
    
                                    <div className="flex flex-row">
                                    <p className="my-auto mr-1.5 text-sm text-gray-400">@</p>
    
                                    <input 
                                    type="text"
                                    placeholder="loggedinuser"
                                    className=" 
                                    bg-gray-50 border border-gray-100 
                                    text-left text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
    
                                    </div>
                                    
    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">E-mail <span className=" text-xxs text-red-400 font-normal"> Enter a valid email</span></p>
    
                                    <input 
                                    type="text"
                                    placeholder="user@gmail.com"
                                    className=" 
                                    bg-gray-50 border border-gray-100
                                    text-xs text-left text-gray-600
                                    overflow-hidden align-right
                                      my-1 rounded p-1
                                    h-7 w-full"></input>
    
                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Password 
                                    <span className=" text-xxs text-red-400 font-normal"> Must be more than 6 characters</span></p>
    
                                    <input 
                                    type="password"
                                    placeholder="*******"
                                    className=" 
                                    bg-gray-50 border border-gray-100
                                    text-left text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>

                                    <p className="  
                                    font-bold text-xs tracking-tight text-gray-600 
                                    ">Confirm 
                                    <span className=" text-xxs text-red-400 font-normal"> Must be more than 6 characters</span></p>
    
                                    <input 
                                    type="password"
                                    placeholder="*******"
                                    className=" 
                                    bg-gray-50 border border-gray-100
                                    text-left text-xs text-gray-600
                                    overflow-hidden
                                      my-1 rounded p-1
                                    h-7 w-full"></input>

                                    <p className="text-xs text-center font-semibold text-red-500 mt-3">Passwords must match</p>
                                    
                                </div>
    
                                <button 
                                className=" 
                                p-1 w-20 rounded-md my-5
                                text-white font-bold text-sm mx-auto
                                bg-lime-500 active:bg-lime-600">
                                Save
                                </button>
    
                        </div>
                    
    
                    </div>
    
                    </div>
                )
            } else {
                return null
            }
        } 

    }