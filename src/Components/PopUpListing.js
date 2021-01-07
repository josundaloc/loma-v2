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
            bg-gray-900 bg-opacity-70 h-screen w-screen fixed z-10">
                <div className="h-7 w-7 text-center rounded bg-red-500">+</div>
                <div className="
            bg-white rounded
            mx-auto mt-20
            h-96 
            se:w-11/12 sm:w-3/4 lg:w-2/3 
            overflow-hidden
            flex flex-col sm:flex-row
            shadow-md
            ">
                <div className="
                sm:w-2/3 sm:h-full sm:inline-block
                h-3/5 psm:h-2/3 w-full
                ">
                    <img className="
                    
                    h-full object-cover 
                    psm:object-contain psm:w-full
                    mx-auto
                    sm:inline-block sm:justify-center
                    "
                    src={dummyImage} />
                </div>
                

                <div className="
                sm:inline-block
                sm:w-1/3 sm:p-2 overflow-auto
                h-1/2 sm:h-full
                border-l
                ">

                        <div className="
                        w-full p-0.5
                        flex flex-row justify-between flex-wrap sm:flex-wrap-reverse
                        inline-block
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
                            >£400</p>

                            <img className="
                                    inline rounded shadow bg-white
                                    h-5 m-0.5 p-0.5 mt-1
                                    flex-none 
                                    "src={gumtree}  alt=""/> 
                            
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
                                        h-4 m-0.5 mt-1
                                        flex-none 
                                        h-5
                                        "src={bookmark}  alt=""/> 

                                <img className="
                                        inline
                                        h-4 mr-1 mt-1 sm:mt-0.5
                                        flex-none
                                        h-5 
                                        "src={heart}  alt=""/> 
                            </div>


                        </div>

                        <p className="
                        m-2 mb-1.5 mt-0
                        leading-none text-base font-bold lg:text-lg
                        ">
                            Lorem ipsum dolor sit amet
                        
                        </p>
                        <p className="
                        m-2 h-5/12
                        leading-none text-sm
                        sm:leading-tight lg:text-base
                        ">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.
                        
                        </p>

                </div>
                

            
            
            </div>

            </div>
        )
    }
}