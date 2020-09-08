import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class Create extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            departmentName:"",
            departmentName_AR:""           
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeArabicName = this.onChangeArabicName.bind(this);        
        this.onSubmit = this.onSubmit.bind(this);
    }
   
    onChangeName(e){
        this.setState({
            departmentName: e.target.value
        });
    }

    onChangeArabicName(e){
        this.setState({
            departmentName_AR: e.target.value
        });
    }

  

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
           departmentName: this.state.departmentName,
           departmentName_AR: this.state.departmentName_AR
        }

        axios.post("api/Department/AddDepartment", tripObject).then(result => {
            history.push('/Departments');
        })

    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Add new Department</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextField
          id="standard-full-width"
          value={this.state.departmentName}
           onChange={this.onChangeName}
          label="Deparmtment Name"
          style={{ margin: 8 }}
          placeholder="Enter Department Name"          
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
              <TextField
          id="standard-full-width"
          value={this.state.departmentName_AR}
           onChange={this.onChangeArabicName}
          label="Department Name (Arabic)"
          style={{ margin: 8 }}
          placeholder="Enter Department Name - Arabic"
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                                               
                    
                    <div className="form-group">
                        <input type="submit" value="Add New Department" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}