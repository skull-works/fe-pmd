import React from 'react';

const Header = ({text,title}) => {
    return(
        <>
        <title title={title}>{title}</title>
        <div id="header-wrapper">
                <div className="w-screen sm:w-full h-20vh bg-green-500 flex flex-wrap content-center justify-center">
                    <h1 className="text-lg md:text-4xl">{text}</h1>
                </div>
        </div>
        </>
    )
}

export default Header;