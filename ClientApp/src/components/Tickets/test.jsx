import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

export class test extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
          ticketdatetime:null,
            serviceType:[],
            serviceTypeID:"",
            requesterName:"",
            requesterEmail:"",
            location:[],
            locationID:"",
            assign:[],
            assignID:"",
            department:[],            
            departmentID:"" ,
            comments:""          
        }
       
        this.OnChangeEmail = this.OnChangeEmail.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.OnChangeName = this.OnChangeName.bind(this);
        this.OnChangeComment = this.OnChangeComment.bind(this);
        this.onChangeAssign = this.onChangeAssign.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeService = this.onChangeService.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.populateDepartmentsData();
        this.populateAssignData();
        this.populateLocationData();
        this.populateServicesTypeData();
    }

    populateDepartmentsData(){        
        axios.get("api/Department/GetDepartments").then(result => {
            const response = result.data;
            this.setState({department: response});        
     //   });
        });
    }
    populateAssignData(){        
        axios.get("api/Assign/GetAssigns").then(result => {
            const response = result.data;
            this.setState({assign: response});        
     //   });
        });
    }
    populateLocationData(){        
        axios.get("api/Location/GetLocations").then(result => {
            const response = result.data;
            this.setState({location: response});        
     //   });
        });
    }
    populateServicesTypeData(){        
        axios.get("api/ServicesType/GetServicesType").then(result => {
            const response = result.data;
            this.setState({serviceType: response});        
     //   });
        });
    }

    OnChangeName(e){
      this.setState({
          requesterName: e.target.value
      });
  }
    OnChangeEmail(e){
      this.setState({
          requesterEmail: e.target.value
      });
  }
    OnChangeComment(e){
      this.setState({
          comments: e.target.value
      });
  }
  onChangeDate(e){
    this.setState({
        ticketdatetime: e.target.value
    });
}

onChangeDepartment(e)
{
  this.setState({
    departmentID: e.target.value
    
  });

}
onChangeAssign(e)
{
  this.setState({
    assignID: e.target.value
    
  });
}
onChangeLocation(e)
{
  this.setState({
    locationID: e.target.value
    
  });
}
onChangeService(e)
{
  this.setState({
    serviceTypeID: e.target.value
    
  });
}
    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
           ticketdatetime:this.state.ticketdatetime,            
            serviceTypeID:this.state.serviceTypeID,
            requesterName:this.state.requesterName,
            requesterEmail:this.state.requesterEmail,            
            locationID:this.state.locationID,
            assignID:this.state.assignID,                     
            departmentID:this.state.departmentID ,
            comments:this.state.comments            
                 }
        alert(tripObject)

        axios.post("api/Ticket/AddTicket", tripObject).then(result => {
          history.push('/Tickets');
        })

    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Add new Ticket</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextField
          id="standard-full-width"
          label="Ticket Date"
          type="date"
          value={this.state.ticketdatetime}
           onChange={this.onChangeDate}
          label="Ticket Date"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div className="form-group">

        <br/>
        <TextField
          id="standard-full-width"
          label="RequsterName"
          value={this.state.requesterName}
           onChange={this.OnChangeName}
          label="Requster Name"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>  
        </div>
        <div className="form-group">
      
        <TextField
          id="standard-full-width"
          label="RequsterEmail"
          value={this.state.requesterEmail}
           onChange={this.OnChangeEmail}
          label="Requster Email"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div className="form-group">

        <br/>
        <InputLabel id="demo-simple-select-error-label">Department</InputLabel>

           <select 
           className="textField"    
           label="Department "     
          value={this.state.departmentID}
          onChange={this.onChangeDepartment }
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

        <br/>    
    <InputLabel id="demo-simple-select-error-label">service Type</InputLabel>

        <select 
           className="textField"         
          value={this.state.serviceTypeID}
          onChange={ this.onChangeService}
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
<br/>
</div>
<div className="form-group">

<InputLabel id="demo-simple-select-error-label">Location</InputLabel>

        <select 
           className="textField"         
          value={this.state.locationID}
          onChange={this.onChangeLocation}
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

        <InputLabel id="demo-simple-select-error-label">Assgin</InputLabel>
        <select         
           className="textField"         
          value={this.state.assignID}
          onChange={this.onChangeAssign}
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

        
        <br/>
        <TextField
          id="standard-full-width"
          label="Comment"
          value={this.state.comments}
           onChange={this.OnChangeComment}
          label="Comments"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>                                               
                    
                    <div className="form-group">
                        <input type="submit" value="Add New Ticket" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}