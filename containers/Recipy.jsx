import React from 'react';
import { connect } from 'react-redux';

class Recipy extends React.Component {
   static fetchData(params) {
        
   }
   
    render() {
        return (
            <h2>Recipy with id {this.props.params.id}</h2>
        );
    }
    
    componentDidMount() {
        if (!this.props.initialData) {
            this.constructor.fetchData(this.props.id);
        }
    }

}