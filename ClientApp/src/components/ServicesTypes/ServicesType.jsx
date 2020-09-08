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

export class ServicesType extends Component
{
    
    constructor(props)
    { 

        super(props);
        this.onServicesTypeUpdate = this.onServicesTypeUpdate.bind(this);
        this.onServicesTypeDelete = this.onServicesTypeDelete.bind(this);
      
        this.state = {
            ServicesTypes:[],
            error:''
        }
    }
    componentDidMount(){
        this.populateServicesTypesData();
    }

    populateServicesTypesData(){
        axios.get("api/ServicesType/GetServicesType").then(result => {
            const response = result.data;
            this.setState({ServicesTypes: response,error:''});
            
     //   });

        });
    }
    onServicesTypeUpdate(id)
    {
        const{history} = this.props;
        history.push('/UpdateServicesType/'+id);
    } 

    Delete(id){
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to Delete Record '+id,
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.onServicesTypeDelete(id)
            },
            {
              label: 'No',
              
            }
          ]
        });
      }
     

    
    onServicesTypeDelete(id)
    {
        axios.delete("api/ServicesType/DeleteServicesType/"+id).then(result => {
            this.populateServicesTypesData();
          
        })
     
    } 
   
    PopulateServicesTypes(ServicesTypes)
    { 
        return(
            
            <TableContainer component={Paper}>
            <Table class="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow align="center">
                  <TableCell align="center">ServicesType ID</TableCell>
                  <TableCell align="center">ServicesType Name</TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { ServicesTypes.map(item =>  (
                  <TableRow key={item.serviceTypeID}>              
                    <TableCell align="center">{item.serviceTypeID}</TableCell>
                    <TableCell align="center">{item.serviceTypeName}</TableCell>
                    <TableCell align="center">
                    <div>
                                      <Button  color="primary" onClick ={() => this.onServicesTypeUpdate(item.serviceTypeID)}>Update</Button>
                                      <div class="divider"/>
                                      <Button onClick ={() => this.Delete(item.serviceTypeID)}  color="secondary">Delete</Button>
      
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
        this.props.history.push("/CreateServicesType");
    }
    render()
    {
      
        let content = this.PopulateServicesTypes(this.state.ServicesTypes);
        return(
            <div>
                <h1>All Services-Types</h1> 
                <br></br> 
            <div>{this.state.error}</div>            
                <Button onClick={this.handleClick} variant="outlined" color="primary" >New Services-Type</Button>
                <br></br> 
                 
                <br></br>
                {content}
            </div>
        )
    }

}
