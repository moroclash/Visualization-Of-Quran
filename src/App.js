import React, { Component } from 'react';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllQuranInfo } from './models/Prepare';
import AddCharBar from './components/AddCharBar';
import ReactVirtualizedTable from './components/CharTable';
import Visualization from './components/Visualization';


let Quran = getAllQuranInfo();
// console.log(Quran)
class App extends Component {
  constructor() {
    super()
    this.state = {
      rows: [],
    }
  }

  onAdd = (rowData) => {
    let newRows = this.state.rows
    rowData.id = newRows.length === 0? 1 : newRows[newRows.length-1].id+1
    newRows.push(rowData)
    this.setState({ rows: newRows })
  }

  onDelete = (id) => {
    let newRows = this.state.rows.filter( row => row.id !== id)
    this.setState({rows: newRows}) 
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <AddCharBar Quran={Quran} onAdd={this.onAdd}/>
        <ReactVirtualizedTable rows={this.state.rows} onDelete={this.onDelete} />
        <Visualization rows={this.state.rows}/>
      </React.Fragment>
    );
  }
}

export default App;