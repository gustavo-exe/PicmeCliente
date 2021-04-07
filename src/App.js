import React from 'react';
import TopBar from "./cmps/TopBar";

import "./css/App.scss";
class App extends React.Component{
  render(){
    return(
      <div className="App">
        <TopBar/>
        <div className="LogoContainer" >
          <div className="Logo"/>
        </div>
        <div className="FormContainer" >
            <div className="LoginForm">
              <div className="FieldContainer">
                  <input type="text" id="UsUsr" placeholder="Usuario" ></input>
              </div>
              <div className="FieldContainer">
                  <input type="paswword" id="UsrPswd" placeholder="Contraseña" />
              </div>
              <div className="FieldContainer">
                  <div className="Button">Acceder</div>
              </div>
            </div>
        </div>  
      </div>
    );
  }
}

export default App;
