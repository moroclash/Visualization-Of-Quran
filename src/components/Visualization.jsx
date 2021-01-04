import React, { Component } from 'react';
import BarPlot from './BarPlot';

class Visualization extends Component {
    render() { 
        return ( 
            <div>
                <BarPlot rows={this.props.rows}/>
            </div>
             );
    }
}
 
export default Visualization;