import React from 'react';
import heart from '../assets/heart.svg';


export class SkeletonListing extends React.Component {
    render() {
        return (   
            <div
            className="
            w-1/2 sm:w-1/3"
            >
                <div className="
                py-0.5 px-0.5 ipx:py-1 ipx:px-1
                w-full h-full rounded-lg
                ">
                    <img
                    src={heart}
                    className="
                    -mb-6 mr-1 pt-1
                    float-right h-6"
                    style={{filter: "drop-shadow(1px 1px 1px #BDBDBE)", webkitFilter: "drop-shadow(1px 1px 1px #BDBDBE)"}} ></img>

                    <div className="
                    animate-pulse
                    bg-gray-100 h-40 psm:h-60 w-full mb-2.5 rounded-lg">
                    </div>

                    <div className="
                    animate-pulse
                    bg-gray-200 h-4 psm:h-6 w-full mb-1 rounded">
                    </div>

                </div>

            </div>

        )
    }
}