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

export class PopUpSearchSettings extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilters = this.updateFilters.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.state = {
            newSearchTerm: "",
            value: { min: 0, max: 1000 },
            ebayValue: true,
            trashnothingValue: true,
            etsyValue: true,
            facebookValue: true,
            gumtreeValue: true,
            depopValue: true,
            sortOrder: "⚡️ Trending ⚡️",
            gridView: "Images only" //"Highest price first ▲" "Lowest price first ▼"
        };
    }

    componentDidMount() {
        this.setState({
            newSearchTerm: this.props.searchTerm,
            value: {
                min: 0,
                max: this.props.maxResultPrice
            },
            sortOrder: this.props.display
        })
    }

    updateFilters() {

        // console.log(
        //     "new searchterm :" + this.state.newSearchTerm,
        //     "ebay: " + this.state.ebayValue, 
        //     "gumtree: " + this.state.gumtreeValue, 
        //     "trashnothing: " + this.state.trashnothingValue, 
        //     "etsy: " + this.state.etsyValue, 
        //     "facebook: " + this.state.facebookValue,
        //     "depop: " + this.state.depopValue,
        //     "minrange: " + this.state.value.min,
        //     "maxrange: " + this.state.value.max,
        //     "sortorder: " + this.state.sortOrder,
        //     "gridview: " + this.state.gridView)
        this.props.setSiteFilters(
            this.state.newSearchTerm, 
            this.state.ebayValue,
            this.state.trashnothingValue,
            this.state.etsyValue,
            this.state.facebookValue,
            this.state.gumtreeValue,
            this.state.depopValue,
            this.state.value.min,
            this.state.value.max,
            this.state.sortOrder)

    }

    resetFilters() {
        this.props.setSiteFilters(
            this.state.newSearchTerm, 
            true,
            true,
            true,
            true,
            true,
            true,
            0,
            100000000,
            "⚡️ Trending ⚡️")
    }

    render() {
            return (
                <div 
                className=""
                >
                    <div 
                    onClick={this.props.toggleSearchSettings}
                    className="
                    bg-coolGray-800 bg-opacity-80 h-full w-full fixed 
                    z-30">                        
                    </div>

                    <div
                    className="
                    fixed z-40 rounded-l-lg right-0 p-1.5 px-2 shadow-lg
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
                            onClick={this.props.toggleSearchSettings}
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
                            id="searchQuery"
                            placeholder={this.props.searchTerm}
                            onChange={async () => {
                                let searchTerm = document.getElementById("searchQuery").value;
                                await this.setState({
                                    newSearchTerm: searchTerm
                                })
                            }}
                            className="
                            text-center text-sm text-gray-700
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

                            <select 
                            onChange={
                                () => {
                                    let sortOrderValue = document.getElementById("sortOrder").value
                                    this.setState({sortOrder: sortOrderValue})}
                            }
                            id="sortOrder"
                            className="
                            border rounded text-center w-32 text-gray-600
                            m-1 text-xs">
                                {/* "⚡️ Trending ⚡️" "Highest price first ▲" "Lowest price first ▼" */}
                                <option value="⚡️ Trending ⚡️" selected={this.state.sortOrder === "⚡️ Trending ⚡️" ? true : false}>⚡️ Trending ⚡️</option>
                                <option value="Highest price first ▲" selected={this.state.sortOrder === "Highest price first ▲" ? true : false}>Highest price first ▲</option>
                                <option value="Lowest price first ▼" selected={this.state.sortOrder === "Lowest price first ▼" ? true : false}>Lowest price first ▼</option>
                            </select>

                        </div>

                        <div
                        className="my-1.5
                        flex flex-row flex-wrap">
                            


                            <div className="flex flex-row flex-wrap justify-between w-full">
                                <h3
                                className="
                                text-gray-600
                                font-bold p-1">Price range:</h3>
                                <input id="minRange" type="number" placeholder={this.state.value.min} className="
                                border rounded text-xxs w-14 h-5 my-auto text-left" 
                                onChange={() => {this.setState(prevState => ({value: {min: document.getElementById("minRange").value, max: prevState.value.max}}))}}></input>
                                <input id="maxRange"type="number" placeholder={this.state.value.max} className="
                                border rounded text-xxs w-14 h-5 ml-2 my-auto text-left mr-1"
                                onChange={() => {this.setState(prevState => ({value: {min: prevState.value.min, max: document.getElementById("maxRange").value}}))}}></input>
                            </div>
                            
                            
                            <div className="w-full m-4 p-1">

                                <InputRange
                                    maxValue={this.props.maxResultPrice}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}/>

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
                                        <input checked={this.state.ebayValue}
                                        onChange={() => {this.setState(prevState => ({ebayValue: !prevState.ebayValue}))}}
                                        id="ebayValue"
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        "src={ebay}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input checked={this.state.depopValue}
                                        onChange={() => {this.setState(prevState => ({depopValue: !prevState.depopValue}))}}
                                        id="depopValue"
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
                                        <input checked={this.state.gumtreeValue}
                                        onChange={() => {this.setState(prevState => ({gumtreeValue: !prevState.gumtreeValue}))}}
                                        id="gumtreeValue"
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        "src={gumtree}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input checked={this.state.facebookValue}
                                        onChange={() => {this.setState(prevState => ({facebookValue: !prevState.facebookValue}))}}
                                        id="facebookValue"
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
                                        <input checked={this.state.etsyValue}
                                        onChange={() => {this.setState(prevState => ({etsyValue: !prevState.etsyValue}))}}
                                        id="etsyValue"
                                        className="my-auto"
                                        type="checkbox"></input>
                                        <img 
                                        className="h-5 ml-2 my-auto
                                        
                                        "src={etsy}></img>
                                    </div>
                                    <div 
                                    className="
                                    w-1/2 h-9 flex flex-row">
                                        <input checked={this.state.trashnothingValue}
                                        onChange={() => {this.setState(prevState => ({trashnothingValue: !prevState.trashnothingValue}))}}
                                        id="trashnothingValue"
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
                            onClick={this.updateFilters}
                            className="
                            bg-gray-100 rounded py-1.5 px-3 mr-2">
                                <p className="
                                font-bold text-gray-700">Reset</p>
                            </button>
                            <button
                            onClick={this.updateFilters}
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