import React from 'react';
import TopBar from '../cmps/TopBar';
import axios from 'axios';

import '../css/ColeccionesPage.scss';
class ColeccionesPage extends React.Component{
    constructor(){
		super();

		this.state = {
			cols_divs:"",
            errorMessage:""
		}
	}

	componentDidMount(){
		this.loadData();
	}

	onColeccionClick = e =>{
		let ColCod = e.target.id;
		window.location = "#/coleccion/"+ColCod;
	}
	render(){
		return (
			<div className="ColeccionesPage">
				<TopBar />
				{this.state.cols_divs}
			</div>
		);
	}

	loadData = () =>{
		//Consulta
		axios.defaults.withCredentials = true;
		axios.post("https://api.movil2.cointla.com/api/colecciones/listado.php", {}).then(res => {
			let jres = res.data;
			
			if (jres.status === "OK") {
				let cols_divs =[];
				//console.log(jres);
				//Recorrido de las coleecions y armado de cada item que se mostrata
				//como la coleccion
				for (const key in jres.payload) {
					if (Object.hasOwnProperty.call(jres.payload, key)) {
						const coleccion = jres.payload[key];
						cols_divs.push(
							<div className="Coleccion" key={coleccion.ColCod} id={coleccion.ColCod} onClick={this.onColeccionClick}>
								<div className="Descripcion" >{coleccion.ColDsc}</div>
								<div className="Icono" ><i className="material-icons" >arrow_forward_ios</i></div>
							</div>
						);
						
					}
				}
				
				//Actulizacion del estado (state) del componente
				//para poder mostrar la coleccion
				this.setState({
					cols_divs: cols_divs
				});
			}else{
				this.setState({errorMessage: jres.payload.message})
			}

		})
	}
}

export default ColeccionesPage;