import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class UpdateLocation extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state={         
          LocationName:""
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.OnCancel = this.OnCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get("api/Location/SingleLocation/"+id).then(loc =>
            {
                const response = loc.data;

                this.setState({                  
                  LocationName:response.locationName
                 })
            }

        )
    }
    
    onChangeName(e){
      this.setState({
          LocationName: e.target.value
      });
  }

 

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;
        let tripObject = {         
          locationName: this.state.LocationName,
          
        }
        
        axios.put("api/Location/UpdateLocation/"+id, tripObject).then(result => {
          history.push('/Locations');
        })

    }
    OnCancel(){
        const {history} = this.props;
        history.push('/Locations');
    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>Update Location</h3>
                <form onSubmit={this.onSubmit}>                   
                    <div className="form-group">
                               <TextField
          id="standard-full-width"
          value={this.state.LocationName}
           onChange={this.onChangeName}
          label="Location Name"
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