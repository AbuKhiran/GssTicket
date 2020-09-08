import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class UpdateServicesType extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state={         
            ServiceTypeName:""
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.OnCancel = this.OnCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get("api/ServicesType/SingleServicesType/"+id).then(item =>
            {
                const response = item.data;

                this.setState({                  
                    ServiceTypeName:response.serviceTypeName
                 })
            }

        )
    }
    
    onChangeName(e){
      this.setState({
        ServiceTypeName: e.target.value
      });
  }

 

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;
        let tripObject = {         
            ServiceTypeName: this.state.ServiceTypeName,
          
        }
        
        axios.put("api/ServicesType/UpdateServicesType/"+id, tripObject).then(result => {
          history.push('/ServicesTypes');
        })

    }
    OnCancel(){
        const {history} = this.props;
        history.push('/ServicesTypes');
    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Update ServicesType</h3>
                <form onSubmit={this.onSubmit}>                   
                    <div className="form-group">
                               <TextField
          id="standard-full-width"
          value={this.state.ServiceTypeName}
           onChange={this.onChangeName}
          label="ServicesType Name"
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