import React , {Component} from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Locations extends Component
{
    
    constructor(props)
    { 

        super(props);
        this.onLocationUpdate = this.onLocationUpdate.bind(this);
        this.onLocationDelete = this.onLocationDelete.bind(this);
      
        this.state = {
            Locations:[],
            error:''
        }
    }
    componentDidMount(){
        this.populateLocationsData();
    }

    populateLocationsData(){
        axios.get("api/Location/GetLocations").then(result => {
            const response = result.data;
            this.setState({Locations: response,error:''});
            
     //   });

        });
    }
    onLocationUpdate(id)
    {
        const{history} = this.props;
        history.push('/UpdateLocation/'+id);
    } 

    Delete(id){
        //const {id} = this.props.match.params;
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to Delete Record '+id,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onLocationDelete(id)
            },
            {
              label: 'No',
              
            }
          ]
        });
      }
     

    
    onLocationDelete(id)
    {
        axios.delete("api/Location/DeleteLocation/"+id).then(result => {
            this.populateLocationsData();
          
        })
     
    } 
   
    PopulateLocations(Locations)
    { 
        return(
            
            <TableContainer component={Paper}>
            <Table class="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow align="center">
                  <TableCell align="center">Location ID</TableCell>
                  <TableCell align="center">Location Name</TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Locations.map(loc =>  (
                  <TableRow key={loc.locationID}>              
                    <TableCell align="center">{loc.locationID}</TableCell>
                    <TableCell align="center">{loc.locationName}</TableCell>
                    <TableCell align="center">
                    <div>
                                      <Button  color="primary" onClick ={() => this.onLocationUpdate(loc.locationID)}>Update</Button>
                                      <div class="divider"/>
                                      <Button onClick ={() => this.Delete(loc.locationID)}  color="secondary">Delete</Button>
      
                                  </div>    
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }
    handleClick = () => {
        this.props.history.push("/CreateLocation");
    }
    render()
    {
      
        let content = this.PopulateLocations(this.state.Locations);
        return(
            <div>
                <h1>All Locations</h1> 
                <br></br> 
            <div>{this.state.error}</div>            
                <Button onClick={this.handleClick} variant="outlined" color="primary" >New Location</Button>
                <br></br> 
                 
                <br></br>
                {content}
            </div>
        )
    }

}

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}