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

export class Ticket extends Component
{
    
    constructor(props)
    { 

        super(props);
        this.onTicketUpdate = this.onTicketUpdate.bind(this);
        this.onTicketDelete = this.onTicketDelete.bind(this);
      
        this.state = {
            Tickets:[],
            DepertmentItems:[],
            error:''
        }
    }
    componentDidMount(){
        this.populateTicketsData();
    }

    populateTicketsData(){
        axios.get("api/Ticket/GetTickets").then(result => {
            const response = result.data;
            this.setState({Tickets: response,error:''});
            
     //   });

        });
    }
    onTicketUpdate(id)
    {
        const{history} = this.props;
        history.push('/UpdateTicket/'+id);
    } 

    Delete(id){
        //const {id} = this.props.match.params;
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to Delete Record '+id,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onTicketDelete(id)
            },
            {
              label: 'No',
              
            }
          ]
        });
      }
     

    
    onTicketDelete(id)
    {
        axios.delete("api/Ticket/DeleteTicket/"+id).then(result => {
            this.populateTicketsData();
          
        })
     
    } 
    DepartmentdropdownData() {

        axios.get("api/Department/GetDepartments").then(result => {
            const response = result.data;
            this.setState({Tickets: null,DepertmentItems:response,error:''});
    
        });
        }
     
   
    PopulateTickets(Tickets)
    { 
        return(
            
            <TableContainer component={Paper}>
            <Table class="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow align="center">
                  <TableCell align="center">Ticket Date</TableCell>
                  <TableCell align="center">ServiceType</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center">RequesterName</TableCell>
                  <TableCell align="center">RequesterEmail</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Assign</TableCell>
                  <TableCell align="center">Comments</TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Tickets.map(item =>  (
                  <TableRow key={item.ticketID}>   
                    <TableCell align="center">{new Date(item.ticketDateTime).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{item.serviceTypeID}</TableCell>
                    <TableCell align="center">{item.departmentID}</TableCell>
                    <TableCell align="center">{item.requesterName}</TableCell>
                    <TableCell align="center">{item.requesterEmail}</TableCell>
                    <TableCell align="center">{item.locationID}</TableCell>
                    <TableCell align="center">{item.assignID}</TableCell>
                    <TableCell align="center">{item.comments}</TableCell>
                    <TableCell align="center">
                    <div>
                                      <Button  color="primary" onClick ={() => this.onTicketUpdate(item.ticketID)}>Update</Button>
                                      <div class="divider"/>
                                      <Button onClick ={() => this.Delete(item.ticketID)}  color="secondary">Delete</Button>
      
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
        this.props.history.push("/CreateTicket");
    }
    render()
    {
      
        let content = this.PopulateTickets(this.state.Tickets);
        return(
            <div>
                <h1>All Tickets</h1> 
                <br></br> 
            <div>{this.state.error}</div>            
                <Button onClick={this.handleClick} variant="outlined" color="primary" >New Ticket</Button>
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