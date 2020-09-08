import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class UpdateAssign extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state={         
            AssignName:""
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.OnCancel = this.OnCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get("api/Assign/SingleAssign/"+id).then(loc =>
            {
                const response = loc.data;

                this.setState({                  
                    AssignName:response.assignName
                 })
            }

        )
    }
    
    onChangeName(e){
      this.setState({
        AssignName: e.target.value
      });
  }

 

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;
        let tripObject = {         
            assignName: this.state.AssignName,
          
        }
        
        axios.put("api/Assign/UpdateAssign/"+id, tripObject).then(result => {
          history.push('/Assigns');
        })

    }
    OnCancel(){
        const {history} = this.props;
        history.push('/Assigns');
    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Update Assign</h3>
                <form onSubmit={this.onSubmit}>                   
                    <div className="form-group">
                               <TextField
          id="standard-full-width"
          value={this.state.AssignName}
           onChange={this.onChangeName}
          label="Assign Name"
          style={{ margin: 8 }}
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                    </div>                 
                    
                    <div className="form-group">
                        <button onClick={this.OnCancel} className="btn btn-default">Cancel</button>
                        <button  type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}