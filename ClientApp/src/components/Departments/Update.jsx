import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class Update extends Component
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
        this.OnCancel = this.OnCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get("api/Department/SingleDepartment/"+id).then(dep =>
            {
                const response = dep.data;

                this.setState({                  
                  departmentName:response.departmentName,
                  departmentName_AR:response.departmentName_AR
                 })
            }

        )
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
        const {id} = this.props.match.params;
        let tripObject = {         
          departmentName: this.state.departmentName,
          departmentName_AR: this.state.departmentName_AR
          
        }
        
        axios.put("api/Department/UpdateDepartment/"+id, tripObject).then(result => {
          history.push('/Departments');
        })

    }
    OnCancel(){
        const {history} = this.props;
        history.push('/Departments');
    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Update Department</h3>
                <form onSubmit={this.onSubmit}>                   
                    <div className="form-group">
                               <TextField
          id="standard-full-width"
          value={this.state.departmentName}
           onChange={this.onChangeName}
          label="Deparmtment Name"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>
                    <TextField
          id="standard-full-width"
          value={this.state.departmentName_AR}
           onChange={this.onChangeArabicName}
          label="Department Name (Arabic)"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />        
                    
                    <div className="form-group">
                        <button onClick={this.OnCancel} className="btn btn-default">Cancel</button>
                        <button  type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}