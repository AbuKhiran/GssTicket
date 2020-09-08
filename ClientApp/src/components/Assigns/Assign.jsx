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

export class Assign extends Component
{
    
    constructor(props)
    { 

        super(props);
        this.onAssignUpdate = this.onAssignUpdate.bind(this);
        this.onAssignDelete = this.onAssignDelete.bind(this);
      
        this.state = {
            Assigns:[],
            error:''
        }
    }
    componentDidMount(){
        this.populateAssignsData();
    }

    populateAssignsData(){
        axios.get("api/Assign/GetAssigns").then(result => {
            const response = result.data;
            this.setState({Assigns: response,error:''});
            
     //   });

        });
    }
    onAssignUpdate(id)
    {
        const{history} = this.props;
        history.push('/UpdateAssign/'+id);
    } 

    Delete(id){
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to Delete Record '+id,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onAssignDelete(id)
            },
            {
              label: 'No',
              
            }
          ]
        });
      }
     

    
    onAssignDelete(id)
    {
        axios.delete("api/Assign/DeleteAssign/"+id).then(result => {
            this.populateAssignsData();
          
        })
     
    } 
   
    PopulateAssigns(Assigns)
    { 
        return(
            
            <TableContainer component={Paper}>
            <Table class="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow align="center">
                  <TableCell align="center">Assign ID</TableCell>
                  <TableCell align="center">Assign Name</TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Assigns.map(item =>  (
                  <TableRow key={item.assignID}>              
                    <TableCell align="center">{item.assignID}</TableCell>
                    <TableCell align="center">{item.assignName}</TableCell>
                    <TableCell align="center">
                    <div>
                                      <Button  color="primary" onClick ={() => this.onAssignUpdate(item.assignID)}>Update</Button>
                                      <div class="divider"/>
                                      <Button onClick ={() => this.Delete(item.assignID)}  color="secondary">Delete</Button>
      
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
        this.props.history.push("/CreateAssign");
    }
    render()
    {
      
        let content = this.PopulateAssigns(this.state.Assigns);
        return(
            <div>
                <h1>All Assigns</h1> 
                <br></br> 
            <div>{this.state.error}</div>            
                <Button onClick={this.handleClick} variant="outlined" color="primary" >New Assign</Button>
                <br></br> 
                 
                <br></br>
                {content}
            </div>
        )
    }

}
