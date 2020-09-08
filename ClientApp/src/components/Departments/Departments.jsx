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

export class Departments extends Component
{
    
    constructor(props)
    { 

        super(props);
        this.onDepartmentUpdate = this.onDepartmentUpdate.bind(this);
        this.onDepartmentDelete = this.onDepartmentDelete.bind(this);
      
        this.state = {
            Departments:[],
            error:''
        }
    }
    componentDidMount(){
        this.populateDepartmentsData();
    }

    populateDepartmentsData(){
        axios.get("api/Department/GetDepartments").then(result => {
            const response = result.data;
            this.setState({Departments: response,error:''});
            
     //   });

        });
    }
    onDepartmentUpdate(id)
    {
        const{history} = this.props;
        history.push('/Update/'+id);
    } 

    Delete(id){
        //const {id} = this.props.match.params;
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to Delete Record '+id,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onDepartmentDelete(id)
            },
            {
              label: 'No',
              
            }
          ]
        });
      }
     

    
    onDepartmentDelete(id)
    {
        axios.delete("api/Department/DeleteDepartment/"+id).then(result => {
            this.populateDepartmentsData();
          
        })
     
    } 
   
    PopulateDepartments(departments)
    { 
        return(
            
            <TableContainer component={Paper}>
            <Table class="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow align="center">
                  <TableCell align="center">Department ID</TableCell>
                  <TableCell align="center">Department Name</TableCell>
                  <TableCell align="center">Department Name (Arabic)</TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { departments.map(dep =>  (
                  <TableRow key={dep.departmentID}>              
                    <TableCell align="center">{dep.departmentID}</TableCell>
                    <TableCell align="center">{dep.departmentName}</TableCell>
                    <TableCell align="center">{dep.departmentName_AR}</TableCell>
                    <TableCell align="center">
                    <div>
                                      <Button  color="primary" onClick ={() => this.onDepartmentUpdate(dep.departmentID)}>Update</Button>
                                      <div class="divider"/>
                                      <Button onClick ={() => this.Delete(dep.departmentID)}  color="secondary">Delete</Button>
      
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
        this.props.history.push("/Create");
    }
    render()
    {
      
        let content = this.PopulateDepartments(this.state.Departments);
        return(
            <div>
                <h1>All Departments</h1> 
                <br></br> 
            <div>{this.state.error}</div>            
                <Button onClick={this.handleClick} variant="outlined" color="primary" >New Department</Button>
                <br></br> 
                 
                <br></br>
                {content}
            </div>
        )
    }

}
