import React from 'react';
import axios from 'axios';
import '../css/TopBar.scss';

class TopBar extends React.Component{
    constructor(){
		super();

		this.state = {
			backTo: "",
            deleteCol: ""
		}
	}

    onBackToClick = e =>{
		window.location = this.props.backTo;
	}

    onDeleteClick = e =>{
		axios.post("https://api.movil2.cointla.com/api/colecciones/eliminar.php", {
			ColCod: this.props.deleteCol
		}).then(res => {
			window.location = this.props.backTo;
		});
	}
    
    componentDidMount(){
        console.log(this.props);
        if (this.props.backTo !== undefined) {
            this.setState({
                backTo:(<div onClick={this.onBackToClick} className="backToIcon"><i className="material-icons">arrow_back_ios</i></div>)
            })
            
        }

        if(this.props.deleteCol !== undefined){
			this.setState({
				deleteCol: (<div onClick={this.onDeleteClick} className="deleteIcon"><i className="material-icons">delete</i></div>)
			})
		}

    }
    render(){
        return(
            <div className="TopBar" >
                <div className="BackToNombre" >
                    {this.state.backTo}
                    
                </div>
                {this.state.deleteCol}
            </div>
        );
    }
}

export default TopBar;