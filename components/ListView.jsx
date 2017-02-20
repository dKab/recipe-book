import React from 'react';
import { NavLink} from './NavLink.jsx';
export class ListView extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to="/recipy/1">recipy 1</NavLink></li>
                    <li>recipy 2</li>
                    <li>recipy 3</li>
                    <li>recipy 4</li>
                    <li>recipy 5</li>
                </ul>
            </div>
        );
    }
}