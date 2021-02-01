import React from 'react';
import { Listing } from './Listing';
import grid from '../assets/grid.svg';
import filter from '../assets/filter.svg';
import sort from '../assets/sort.svg';
import { TopNav } from './TopNav';

export class UserAccount extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
        <div className="max-w-screen-md flex flex-col justify-center content-center mx-auto px-3 lg:pt-6">
            <div><TopNav toggleMainDisplay={this.props.toggleMainDisplay}/></div>
            <h1 className="font-bold text-2xl tracking-tight
            ">My Account:</h1>
            <div className="results p-1 max-w-screen-md h-screen
                    w-full flex flex-col flex-wrap content-center ">
                        <div className="
                        bg-yellow-50 m-5 h-32 w-32 rounded-full mx-auto flex flex-col justify-center content-center">
                        <h3 className="text-5xl mb-1 text-center">🌱</h3>
                        
                        </div>

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


        )
    }
}