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
//import './Listing.css';

const truncate100 = (input) => input.length > 100 ? `${input.substring(0, 100)}...` : input;
const truncate50 = (input) => input.length > 35 ? `${input.substring(0, 35)}...` : input;

export class PopUpListing extends React.Component {
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
            bg-white rounded
            mx-auto mt-5
            h-96 se:w-11/12 border
            ">
                <img className="
                h-1/2 w-full
                object-cover
                "
                src={dummyImage} />

                <div className="
                h-8 w-full p-0.5
                flex flex-row justify-between
                ">

                    <div className="
                    ">

                    <p className="
                        inline-block
                        px-1 m-1 rounded-sm shadow
                        font-bold text-sm text-lime-600
                        bg-lime-50 text-center
                        flex-grow-0"
                    >£400</p>

                    <img className="
                            inline-block rounded shadow bg-white
                            h-5 m-0.5 p-0.5
                            flex-none 
                            "src={gumtree}  alt=""/> 
                    
                    <img className="
                            inline-block
                            h-4 m-0.5 p-0.5
                            flex-none 
                            "src={link}  alt=""/> 

                    </div>



                    <div className="">
                        <img className="
                                inline-block 
                                h-4 m-0.5
                                flex-none 
                                "src={bookmark}  alt=""/> 

                        <img className="
                                inline-block 
                                h-4 mr-0.5
                                flex-none 
                                "src={heart}  alt=""/> 
                    </div>


                </div>

                <p className="
                m-1 mb-1.5
                leading-none text-base font-bold
                ">
                    Lorem ipsum dolor sit amet
                
                </p>
                <p className="
                m-1
                leading-none text-sm
                ">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.
                
                </p>

            
            
            </div>

        )
    }
}