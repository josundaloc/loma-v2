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

const truncate100 = (input) => input.length > 100 ? `${input.substring(0, 100)}...` : input;
const truncate50 = (input) => input.length > 35 ? `${input.substring(0, 35)}...` : input;

export class PopUpListing extends React.Component {
    constructor(props) {
        super(props);
        this.openWindow = this.openWindow.bind(this);
        this.logo = this.logo.bind(this);
        this.togglePopUp = this.togglePopUp.bind(this);
        this.nextListing = this.nextListing.bind(this);
        this.previousListing = this.previousListing.bind(this);


    }

    componentDidMount() {

 
        const handleNext = (e) => {
            console.log("keypress detected")
            if (e.keyCode === 39) {
                this.nextListing() 
            } else if (e.keyCode === 37) {
                this.previousListing()
            } else if (e.keyCode === 27 && this.props.display === true) {
                this.togglePopUp()
            } else {
                return
            }
        }

        document.addEventListener("keydown", handleNext);
    }

    logo() {
        if (this.props.listing.site === "ebay") { return ebay; }
        else if (this.props.listing.site === "depop") { return depop; }
        else if (this.props.listing.site === "gumtree") { return gumtree; }
        else if (this.props.listing.site === "facebook") { return facebook; }
        else if (this.props.listing.site === "etsy") { return etsy; }
        else if (this.props.listing.site === "trashnothing") {return trashnothing; }
        else { return ; }
    }

    openWindow() {
        window.open(this.props.listing.url);
    }

    togglePopUp() {
        this.props.togglePopUp(this.props.listing)
    }

    nextListing() {
        this.props.changeActiveListing(this.props.listing, "next");
    }

    previousListing() {
        this.props.changeActiveListing(this.props.listing, "previous");
    }

    render() {
        if (this.props.display === true) {
            return (
                <div 
                className=""
                >
                    <div
                        className="
                            opacity-70 fixed
                            w-screen h-1/2
                            top-32 sm:top-44
                             z-40
                            flex flex-row justify-between"
                        >
                            <div
                            onClick={this.previousListing}
                            className=" h-full w-1/6
                            z-50 flex flex-col justify-center
                            ">
                                <button
                                className="
                                w-10 h-10 sm:w-12 sm:h-12 transform rotate-180
                                z-50 mx-auto
                                "
                                ><img src={next}></img></button>
                            </div>

                            <div
                            onClick={this.nextListing}
                            className=" h-full w-1/6
                            z-50 flex flex-col justify-center
                            ">
                                <button
                                className="
                                w-10 h-10 sm:w-12 sm:h-12 
                                z-50 mx-auto
                                "
                                ><img src={next}></img></button>

                            </div>
                        </div>
                    <div 
                    onClick={this.togglePopUp}
                    className="
                     bg-coolGray-800 bg-opacity-80 h-full w-full fixed 
                     z-30">
                         
                        <div
                        onClick={this.togglePopUp}
                        className="
                        cursor-pointer
                        top-12 right-1/24 sm:right-1/8 lg:right-1/6 absolute z-50
                        h-6 w-6 text-center rounded bg-red-500"><p className="
                        transform rotate-45 text-white font-extrabold">+</p></div>


                        <div className="
                    z-40 cursor-pointer
                    bg-white rounded
                    mx-auto mt-20
                    h-2/3
                    se:w-11/12 sm:w-3/4 lg:w-2/3 
                    overflow-hidden
                    flex flex-col sm:flex-row
                    shadow-md
                    "
                    onClick={this.nextListing}>
                        <div className="
                        sm:w-2/3 sm:h-full sm:inline-block
                        h-3/5 psm:h-2/3 w-full bg-coolGray-700
                        ">
                            <img className="
                            
                            h-full object-cover 
                            psm:object-contain psm:w-full
                            mx-auto
                            sm:inline-block sm:justify-center
                            "
                            src={this.props.listing.image ? this.props.listing.image : imagePlaceholder} />
                        </div>
                        
        
                        <div className="
                        sm:inline-block
                        sm:w-1/3 overflow-auto
                        h-1/2 sm:h-full
                        border-l
                        ">
        
                                <div className="
                                w-full p-0.5 sm:p-2
                                flex flex-row justify-between flex-wrap sm:flex-wrap-reverse
                                inline-block
                                sticky top-0
                                shadow bg-white
                                ">
        
                                    <div className="
                                    flex flex-row flex-nowrap
                                    ">
        
                                    <p className="
                                        inline
                                        px-1 m-1 rounded-sm shadow
                                        font-bold text-sm text-lime-600
                                        bg-lime-50 text-center
                                        flex-grow-0"
                                    >£{this.props.listing.price}</p>
        
                                    <img className="
                                            inline rounded shadow bg-white
                                            h-5 m-0.5 p-0.5 mt-1
                                            flex-none 
                                            "src={this.logo()}  alt=""/> 
                                    
                                    <img className="
                                            inline
                                            h-4 m-0.5 p-0.5 mt-1.5
                                            flex-none 
                                            "src={link}  alt=""/> 
        
                                    </div>
        
        
        
                                    <div className="
                                        -mt-1 
                                        sm:block sm:flex-row-reverse flex flex-row flex-nowrap inline-block">
                                        <img className="
                                                inline
                                                h-4 m-0.5 mt-1.5
                                                flex-none 
                                                h-5
                                                "src={bookmark}  alt=""/> 
        
                                        <img className="
                                                inline
                                                h-4 mr-1 mt-1.5 sm:mt-0.5
                                                flex-none
                                                h-5 
                                                "src={heart}  alt=""/> 
                                    </div>
        
        
                                </div>
        
                                <p className="
                                bg-warmGray-100 text-warmGray-700
                                p-2 sm:px-3 mt-0
                                leading-none text-base font-bold lg:text-lg lg:leading-tight
                                ">
                                    {this.props.listing.title}
                                
                                </p>
                                <p className="
                                p-2 sm:px-3 h-5/12
                                leading-5 text-sm
                                lg:text-base lg:leading-5
                                break-words text-warmGray-800
                                ">
                                    {this.props.listing.description}
                                
                                </p>
        
                        </div>
                        
        
                    
                    
                        </div>

                        </div>
                    
    
                </div>
            )
        } else {
            return null;
        }

    }
}