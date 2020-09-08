import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

export class CreateTicket extends Component
{
    constructor(props){

        super(props);
       
        this.state={
            ticketdatetime:null,
            serviceType:[],
            serviceTypeID:"",
            RequesterName:"",
            RequesterEmail:"",
            location:[],
            locationID:"",
            assign:[],
            assignID:"",
            department:[],            
            departmentID:"" ,
            Comments:"" 
        }

        this.changeAssign = this.changeAssign.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDepartment = this.changeDepartment.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeService = this.changeService.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount()
    {
        this.populateAssign();
        this.populateDepartment();
        this.populateLocation();
        this.populateService();
    }

    populateDepartment()
    {
        axios.get("api/Department/GetDepartments").then(result => {
            const response = result.data;
            this.setState({department: response});        
     //   });
        });
    }
    populateAssign()
    {
        axios.get("api/Assign/GetAssigns").then(result => {
            const response = result.data;
            this.setState({assign: response});        
     //   });
        });
    }
    populateService()
    {
        axios.get("api/ServicesType/GetServicesType").then(result => {
            const response = result.data;
            this.setState({serviceType: response});        
     //   });
        });
    }
    populateLocation()
    {
        axios.get("api/Location/GetLocations").then(result => {
            const response = result.data;
            this.setState({location: response});        
     //   });
        });
    }

    changeDate(e)
    {
        this.setState({
            ticketdatetime:e.target.value
        });
    }
    changeName(e)
    {
        this.setState({
            RequesterName:e.target.value
        });
    }
    changeEmail(e)
    {
        this.setState({
            RequesterEmail:e.target.value
        });
    }
    changeDepartment(e)
    {
        this.setState({
            departmentID:e.target.value
        });
    }
    changeLocation(e)
    {
        this.setState({
            locationID:e.target.value
        });
    }
    changeAssign(e)
    {
        this.setState({
            assignID:e.target.value
        });
    }
    changeService(e)
    {
        this.setState({
            serviceTypeID:e.target.value
        });
    }
    changeComment(e)
    {
        this.setState({
            Comments:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
           ticketdatetime:this.state.ticketdatetime,            
            serviceTypeID:this.state.serviceTypeID,
            RequesterName:this.state.RequesterName,
            RequesterEmail:this.state.RequesterEmail,            
            locationID:this.state.locationID,
            assignID:this.state.assignID,                     
            departmentID:this.state.departmentID ,
            Comments:this.state.Comments            
                 }
        alert(tripObject)

        axios.post("api/Ticket/AddTicket", tripObject).then(result => {
          history.push('/Tickets');
        })

    }
    render()
    {
return(<div>
    <div className="trip-form" >
                <h3>Add new Ticket</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Ticket Date :  </label>
                        <input 
                          type="Date" 
                          className="form-control" 
                          value={this.state.ticketdatetime}
                          onChange={this.changeDate}
                         />
                    </div>
                    <div className="form-group">
                        <label>Ticket Requseter Name :  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.RequesterName}
                          onChange={this.changeName}
                         />
                    </div>
                    <div className="form-group">
                        <label>Ticket Email :  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.RequesterEmail}
                          onChange={this.changeEmail}
                         />
                    </div>
                    <div className="form-group">
                        <label>Department :  </label>
                        <select 
           className="textField"    
           label="Department "     
          value={this.state.departmentID}
          onChange={this.changeDepartment }
        >
          {this.state.department.map(team => (
            <option
              key={team.departmentID}
              value={team.departmentID}
            >
              {team.departmentName}
            </option>
          ))}
        </select>
                    </div>

                    <div className="form-group">
                        <label>Location :  </label>
                        <select 
           className="textField"    
           label="Location "     
          value={this.state.locationID}
          onChange={this.changeLocation }
        >
          {this.state.location.map(team => (
            <option
              key={team.locationID}
              value={team.locationID}
            >
              {team.locationName}
            </option>
          ))}
        </select>
                    </div>
                    <div className="form-group">
                        <label>Assign :  </label>
                        <select 
           className="textField"    
           label="Department "     
          value={this.state.assignID}
          onChange={this.changeAssign }
        >
          {this.state.assign.map(team => (
            <option
              key={team.assignID}
              value={team.assignID}
            >
              {team.assignName}
            </option>
          ))}
        </select>
                    </div>
                    <div className="form-group">
                        <label>Service type :  </label>
                        <select 
           className="textField"    
           label="Department "     
          value={this.state.serviceTypeID}
          onChange={this.changeService }
        >
          {this.state.serviceType.map(team => (
            <option
              key={team.serviceTypeID}
              value={team.serviceTypeID}
            >
              {team.serviceTypeName}
            </option>
          ))}
        </select>
                    </div>
                    <div className="form-group">
                        <label>Ticket Comment :  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.Comments}
                          onChange={this.changeComment}
                         />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add New Ticket" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
</div>)
    }
}
