import React from 'react';

import '../css/TopBar.scss';

class TopBar extends React.Component{
    render(){
        return(
            <div className="TopBar" >
                <div className="Logo" ></div>
                <div className="MenuIcon" ></div>
            </div>
        );
    }
}

export default TopBar;