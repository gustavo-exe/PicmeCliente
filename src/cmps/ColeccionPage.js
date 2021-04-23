import React from 'react';
import TopBar from '../cmps/TopBar';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../css/ColeccionPage.scss';
class ColeccionPage extends React.Component{
    constructor(){
		super();

		this.state = {
			col_fotos: "",
            col_name: ""
		}
	}

    componentDidMount(){
        //console.log(this.props.ColCod);
        this.loadData(this.props.ColCod);
    }

	onAddFotoClick = e =>{
		document.getElementById("file").click();
	} 

	onFotoSelected = e =>{
		var imageFile = document.getElementById("file");
		let fileSize = imageFile.files[0].size;
		if (fileSize <= 19000000) {
			var formData = new FormData();
			formData.append("ColCod", this.props.ColCod);
			formData.append("FotFile",imageFile.files[0]);
			var _this = this;

			axios.post("https://api.movil2.cointla.com/api/fotos/crear.php", formData, {
				headers: {
					'Content-Type':'multipart/form-data'
				}
			}).then(res=>{
				_this.loadData(_this.props.ColCod);
			})
		}else{
			alert("¡La fotografia es muy pesada! 20MB Máximo");
		}
	}


    render(){
        return(
            <div className="ColeccionPage"  >
                <TopBar backTo="#/colecciones" deleteCol={this.props.ColCod} />
                <h2 className="Title">{this.state.col_name}</h2>
                
				<input type="file" onChange={this.onFotoSelected} name="file" id="file" style={{display: "none"}}  />
				<div className="AddFoto" onClick={this.onAddFotoClick} >
					<i className="material-icons"> add_a_photo</i>
				</div>
				<div className="ContainerImage" >
                    {this.state.col_fotos}
                </div>
            </div>
        );
    }

    loadData = ColCod =>{
		//Consulta
		var _this = this;

		axios.defaults.withCredentials = true;
		axios.post("https://api.movil2.cointla.com/api/colecciones/obtener.php", {
            ColCod: ColCod
        }).then(res => {
			let jres = res.data;

			if(jres.status === "OK"){
				let col_fotos = [];
                let col_name = jres.payload.ColNom;
				
				// Iteracion de todas las fotos para armar con ella su contenedor
				for (const key in jres.payload.fotos) {
					if (Object.hasOwnProperty.call(jres.payload.fotos, key)) {
						const foto = jres.payload.fotos[key];
                        let foto_url = "https://api.movil2.cointla.com/data"+foto.FotPath;
						
						let onDeleteClick = e =>{
							axios.post("https://api.movil2.cointla.com/api/fotos/eliminar.php", {
								ColCod: ColCod,
								FotCod: foto.FotCod
							}).then(res => {
								_this.loadData(_this.props.ColCod);
							});
						}

						col_fotos.push(
							<div className="CoverImage" key={foto.FotCod} id={foto.FotCod} style={{backgroundImage: "url("+foto_url+")"}}>
								<div className="DeleteIcon" onClick={onDeleteClick}><i className="material-icons">delete</i></div>
							</div>
						);
					}
				}

				// Actualizacion del State del Componente para mostrar las fotos y el nombre de
				this.setState({
					col_fotos: col_fotos,
                    col_name: col_name
				});
			}else{
				this.setState({errorMessage: jres.payload.message});
			}
		});
	}
    
}
let _ColeccionPage = function(){
    let {ColCod} = useParams();
    return (<ColeccionPage ColCod={ColCod}></ColeccionPage>)
}
export default _ColeccionPage;