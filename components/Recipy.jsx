import React from 'react';

export class Recipy extends React.Component {
    render() {
        return (
            <h2>Recipy with id {this.props.params.id}</h2>
        );
    }
}