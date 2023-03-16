import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";

import css from './App.module.css';

export class App extends Component {

  formSubmit = data => {
    console.log(data)

  }

render(){
  return (
    <div className={css.app}>
     <Searchbar onSubmit={this.formSubmit}/>
      
    </div>
  );
}
  
};
