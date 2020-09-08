import React , {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

export class CreateAssign extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            assignName:""          
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e){
        this.setState({
            assignName: e.target.value
        });
    }

   

  

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let tripObject = {
            assignName: this.state.assignName
                }

        axios.post("api/Assign/AddAssign", tripObject).then(result => {
            history.push('/Assigns');
        })

    }


    render()
    {
        return (
            <div className="trip-form" >
                <h3>New Assigns</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextField
          id="standard-full-width"
          value={this.state.assignName}
           onChange={this.onChangeName}
          label="Assign Name"
          style={{ margin: 8 }}
          placeholder="Enter Assign Name"          
          className="textField"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         </div>              

                    <div className="form-group">
                        <input type="submit" value="New Assign" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}