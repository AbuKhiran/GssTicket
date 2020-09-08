import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Departments } from './components/Departments/Departments';
import { Create } from './components/Departments/Create';
import { Update } from './components/Departments/Update';
import { Locations } from './components/Locations/Locations';
import { CreateLocation } from './components/Locations/CreateLocation';
import { UpdateLocation } from './components/Locations/UpdateLocation';
import { Assign } from './components/Assigns/Assign';
import { CreateAssign } from './components/Assigns/CreateAssign';
import { UpdateAssign } from './components/Assigns/UpdateAssign';
import { ServicesType } from './components/ServicesTypes/ServicesType';
import { CreateServicesType } from './components/ServicesTypes/CreateServicesType';
import { UpdateServicesType} from './components/ServicesTypes/UpdateServicesType';
import { Ticket } from './components/Tickets/Ticket';
import { CreateTicket } from './components/Tickets/CreateTicket';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/Departments' component={Departments} />
        <Route path='/Create' component={Create} />
        <Route path='/Update/:id' component={Update} />
        <Route path='/Locations' component={Locations} />
        <Route path='/CreateLocation' component={CreateLocation} />
        <Route path='/UpdateLocation/:id' component={UpdateLocation} />
        <Route path='/Assigns' component={Assign} />
        <Route path='/CreateAssign' component={CreateAssign} />
        <Route path='/UpdateAssign/:id' component={UpdateAssign} />
        <Route path='/ServicesTypes' component={ServicesType} />
        <Route path='/CreateServicesType' component={CreateServicesType} />
        <Route path='/UpdateServicesType/:id' component={UpdateServicesType} />
        <Route path='/Tickets' component={Ticket} />
        <Route path='/CreateTicket' component={CreateTicket} />

      </Layout>
    );
  }
}
