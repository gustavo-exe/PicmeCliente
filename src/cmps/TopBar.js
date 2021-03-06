import React from 'react';
import axios from 'axios';
import '../css/TopBar.scss';

class TopBar extends React.Component{
    constructor(){
		super();
        let isLogued = localStorage.getItem("logued");
		if(!isLogued){
			window.location = "#/";
		}

		this.state = {
			backTo: "",
            deleteCol: "",
            logout: "",
            encabezado:""
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

    onLogoutClick = e =>{
        window.localStorage.removeItem("logued");
		window.location = "#/";
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

        let isLogued = localStorage.getItem("logued");
		if((this.props.backTo === undefined) && (this.props.deleteCol === undefined) && isLogued){
			this.setState({
				logout: (<div onClick={this.onLogoutClick} className="logoutIcon"><i className="material-icons">logout</i></div>)
			})
		}

        if(this.props.encabezado !== undefined){
			this.setState({
				encabezado: (<div className="Encabezado">{this.props.encabezado}</div>)
			})
		}

    }
    render(){
        return(
            <div className="TopBar" >
                <div className="BackToEncabezado" >
                    {this.state.encabezado}
                    {this.state.backTo}
                </div>
                {this.state.logout}
                {this.state.deleteCol}
            </div>
        );
    }
}

export default TopBar;