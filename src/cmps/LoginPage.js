import React from 'react';
import TopBar from "./TopBar";
import axios from 'axios';
import "../css/LoginPage.scss";
class LoginPage extends React.Component{

    //Estado del componente
    constructor()
    {
        super();

        this.state = {
            "UsrUsr":"",
            "UsrPwd":"",
            "errorMessage":""
        }
    }
    //Metodo landan
    onLoginClick = e =>{
        let UsrUsr = this.state.UsrUsr;
        let UsrPwd = this.state.UsrPwd;
        
        axios.defaults.withCredentials = true;
        axios.post("https://api.movil2.cointla.com/api/usuarios/login.php",{
        UsrUsr: UsrUsr,
        UsrPwd: UsrPwd
        }).then(res =>{
            let jres = res.data;
            //Respuesta del servisor
            //console.log(res);
            if (jres.status === "OK") {
                window.location = "#/colecciones";
                window.localStorage.setItem("logued","OK");
            }else{
                this.setState({errorMessage: jres.payload.message});
            }
        });
    }

    render(){
        return(
        <div className="LoginPage">
            <TopBar/>
            <div className="LogoContainer" >
            <div className="Logo"/>
            </div>
            <div className="FormContainer" >
                <div className="LoginForm">
                <p>Ingresar</p>
                <div className="FieldContainer">
                    <input type="text" id="UsUsr" onChange={e =>this.setState({UsrUsr: e.target.value})} value={this.state.UsrUsr} placeholder="Usuario" autoComplete="new-password" ></input>
                </div>
                <div className="FieldContainer">
                    <input type="password" id="UsrPswd" onChange={e =>this.setState({UsrPwd: e.target.value})} value={this.state.UsrPwd} placeholder="Contraseña" autoComplete="new-password"/>
                </div>
                <div className="ErrorMessage">{this.state.errorMessage}</div>
                <div className="FieldContainer">
                    <div onClick={this.onLoginClick} className="Button">Acceder</div>
                </div>
                </div>
            </div>  
        </div>
        );
    }
}

export default LoginPage;
