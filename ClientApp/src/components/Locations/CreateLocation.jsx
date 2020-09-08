import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class CreateLocation extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            locationName:""          
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e){
        this.setState({
            locationName: e.target.value
        });
    }

   

  

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
           locationName: this.state.locationName
                }

        axios.post("api/Location/AddLocation", tripObject).then(result => {
            history.push('/Locations');
        })

    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>New Locations</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextField
          id="standard-full-width"
          value={this.state.locationName}
           onChange={this.onChangeName}
          label="Location Name"
          style={{ margin: 8 }}
          placeholder="Enter Location Name"          
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         </div>              

                    <div className="form-group">
                        <input type="submit" value="New Location" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}