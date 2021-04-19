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

    render(){
        return(
            <div className="ColeccionPage" >
                <TopBar/>
                <h2 className="Title">{this.state.col_name}</h2>
                <div className="ContainerImage" >
                    {this.state.col_fotos}
                </div>
            </div>
        );
    }

    loadData = ColCod =>{
		//Consulta
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
						col_fotos.push(
							<div className="CoverImage" key={foto.FotCod} id={foto.FotCod} style={{backgroundImage: "url("+foto_url+")"}}></div>
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