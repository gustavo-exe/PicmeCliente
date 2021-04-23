import React from 'react';
import TopBar from '../cmps/TopBar';
import axios from 'axios';

import '../css/ColeccionesPage.scss';
class ColeccionesPage extends React.Component{
    constructor(){
		super();

		this.state = {
			cols_divs:"",
            errorMessage:"",
			ColNom: "",
			ColDsc: "",
			showAddColeccion: "none"
		}
	}

	componentDidMount(){
		this.loadData();
	}

	onColeccionClick = e =>{
		let ColCod = e.target.id;
		window.location = "#/coleccion/"+ColCod;
	}

	onCreateClick = e =>{
		var _this = this;
		axios.post("https://api.movil2.cointla.com/api/colecciones/crear.php", {
			ColNom: this.state.ColNom,
			ColDsc: this.state.ColDsc
		}).then(res => {
			_this.loadData();
			this.setState({showAddColeccion: "none", ColNom: "", ColDsc: ""});

		});
	}

	onCancelClick = e =>{
		this.setState({
			showAddColeccion: "none"
		});
	}

	onAddColeccionClick = e =>{
		this.setState({
			showAddColeccion: "flex"
		});
	}

	render(){
		return (
			<div className="ColeccionesPage">
				<TopBar encabezado="Colecciones" />

				<div className="AddColeccionForm" style={{display: this.state.showAddColeccion}}>
					<div className="Container">
						<h3>Crear coleccion</h3>
						<div className="NombreInput">
							<input placeholder="Nombre de la colección." onChange={e=>this.setState({ColNom: e.target.value})} value={this.state.ColNom} ></input>
							<input placeholder="Descrpcion." onChange={e=>this.setState({ColDsc: e.target.value})} value={this.state.ColDsc} ></input>
						</div>
						<div className="Opciones" >
							<div className="CancelButton" onClick={this.onCancelClick} >Cancelar</div>
							<div className="CrearButton" onClick={this.onCreateClick} >Crear</div>
						</div>

					</div>
				</div>

				<div className="AddColeccion"  onClick={this.onAddColeccionClick} ><i className="material-icons">add_circle_outline</i></div>
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
								<div className="Nombre" >{coleccion.ColNom}</div>
								<br></br>
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