import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class CreateServicesType extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            servicesTypeName:""          
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e){
        this.setState({
            serviceTypeName: e.target.value
        });
    }

   

  

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
            ServiceTypeName: this.state.serviceTypeName
                }

        axios.post("api/ServicesType/AddServicesType", tripObject).then(result => {
            history.push('/ServicesTypes');
        })

    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>New Services-Type</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextField
          id="standard-full-width"
          value={this.state.serviceTypeName}
           onChange={this.onChangeName}
          label="Services-Type Name"
          style={{ margin: 8 }}
          placeholder="Enter ServicesType Name"          
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         </div>              

                    <div className="form-group">
                        <input type="submit" value="New Services-Type" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}