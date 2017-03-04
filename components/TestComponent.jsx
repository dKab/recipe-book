import React from 'react';

export class ChildComponentForTest extends React.Component {
    static fetchData() {
        return new Promise( (resolve, reject) => {
            resolve(console.log('fetch was called on child component')); //undefined
        });
    }
    
    render() {
        return (<div>
                This is child component of ListView
            </div>
        );
    }
}

