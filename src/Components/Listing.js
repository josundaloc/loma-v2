import React from 'react';
import "tailwindcss/tailwind.css"
import depop from '../assets/depop.png';
import ebay from '../assets/ebay.png';
import gumtree from '../assets/gumtree.png';
import facebook from '../assets/facebook.png';
import imagePlaceholder from '../assets/gallery.png'; 
import etsy from '../assets/Etsy.png'; 
import trashnothing from '../assets/Freecycle.png';

import heart from '../assets/heart.svg';
//import './Listing.css';

const truncate100 = (input) => input.length > 100 ? `${input.substring(0, 100)}...` : input;
const truncate50 = (input) => input.length > 35 ? `${input.substring(0, 35)}...` : input;

export class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.openWindow = this.openWindow.bind(this);
        this.logo = this.logo.bind(this);


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

    render() {
        return (

            // LISTING ITSELF
            <div className="
            
            bg-white
            se:h-40 se:w-40 ipx:h-44 ipx:w-44 sm:h-52 sm:w-52
            ipx:mr-1 ipx:mb-1 se:rounded shadow-md
            flex flex-wrap flex-col justify-center
            cursor-pointer
            relative

            " listing={this.props.listing} onClick={this.openWindow}>

                    {/* IMAGE THUMBNAIL */}
                    <img className="
                        
                        se:h-40 se:w-40 ipx:h-44 ipx:w-44 sm:h-52 sm:w-52
                        absolute
                        z-10
                        se:rounded
                        object-cover"
                    src={this.props.listing.image ? this.props.listing.image : imagePlaceholder} alt="Thumbnail" />

                    {/* OVERLAY */}
                    <div className="
                    se:h-40 se:w-40 ipx:h-44 ipx:w-44 sm:h-52 sm:w-52 
                    flex flex-col justify-between absolute z-20">
                        {/* HEART */}
                        <div className="
                        
                        flex flex-row-reverse">
                            <img className="
                                h-4 flex-none
                                m-2
                                "src={heart}  alt={this.props.listing.site}/>
                        </div>
                        
                        {/* INFO DIV */}
                        <div className="
                            
                            flex flex-row justify-start items-center
                            h-7
                            ">
                            <p className="
                                
                                px-1 m-1 rounded-sm shadow
                                font-bold text-xs text-lime-600
                                bg-lime-50 text-center
                                flex-grow-0"
                            >£{this.props.listing.price}</p>

                            <div className="
                            bg-white rounded-sm shadow">
                            <img className="
                            h-3 m-0.5
                            flex-none 
                            "src={this.logo()}  alt={this.props.listing.site}/> 

                            </div >
                           
                            </div>
                    </div>
                    

           </div>

        )
    }
}