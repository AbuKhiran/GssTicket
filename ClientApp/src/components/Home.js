import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <p>Welcome ASD Ticketing System , You Can Manage(Create , Update & Delete ) :</p>
        <ul>
        <li>
         <Link to="/Departments">Departments</Link>
        </li>
        <li>
         <Link to="/Assigns">Assigns</Link>
        </li>
        <li>
         <Link to="/Locations">Locations</Link>
        </li>
        <li>
         <Link to="/ServicesTypes">ServicesTypes</Link>
        </li>
        <li>
         <Link to="/Tickets">Tickets</Link>
        </li>
         
        </ul>
     </div>
    );
  }
}
