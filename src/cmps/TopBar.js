import React from 'react';

import '../css/TopBar.scss';

class TopBar extends React.Component{
    constructor(){
		super();

		this.state = {
			backTo: ""
		}
	}
    onBackToClick = e =>{
		window.location = this.props.backTo;
	}
    
    componentDidMount(){
        if (this.props.backTo !== undefined) {
            this.setState({
                backTo:(<div onClick={this.onBackToClick} className="backToIcon"><i className="material-icons">arrow_back_ios</i></div>)
            })
            
        }
    }
    render(){
        return(
            <div className="TopBar" >
                {this.state.backTo}
                <div className="Logo" ></div>
                <div className="MenuIcon" ></div>
            </div>
        );
    }
}

export default TopBar;