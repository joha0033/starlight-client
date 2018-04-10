import React, { Component } from 'react'
import { GetData } from './Helpers'
import moment from 'moment'


import styled from 'styled-components';

import { Row , Col , DropdownButton , MenuItem } from 'react-bootstrap';


const DisplayCard = styled.div`

  text-align: left;
  width: 800px;
  min-height: 50px;
  margin: 30px auto;
`;

const DisplayTitle = styled.div`
  text-decoration: underline;
`;

const DisplayContent = styled.div`
  padding-left: 2em;
`;



class DataDisplay extends Component {

  constructor(props){

    super(props)

    this.state = {
      data: []
    }

    this.fetchData = this.fetchData.bind(this)
    this.dataMap = this.dataMap.bind(this)
    this.sortData = this.sortData.bind(this)

  }

  // CALL FETCH WHEN COMPONENT MOUNTS
  componentWillMount() {

    this.fetchData()

  }

  // FETCH CAN JSON DATA AND SET STATE
  fetchData() {

    GetData().then((results) => {

      this.setState({data: results}, () => {

        // SNAG LOCATION AND CONVERT WITH GOOGLE API
        console.log('data set? ', !!this.state.data);

      })

    })
  }

  // SORT THE DATA BY TYPE
  sortData(type) {

    console.log(type);
    let sortedArray = this.state.data

    type.includes('Date')
    ? sortedArray.sort((a, b) => {

      return new Date(b[type]) - new Date(a[type]);

    })
    : sortedArray.sort((a, b) => {


      return b[type] - a[type]

    })


    this.setState({data: sortedArray}, ()=>{
      console.log('sorted');
    })
    return this.dataMap()
  }

  // DISPLAYS ALL CAN
  dataMap() {
  console.log('dataMap');

  // KEEP IMMUTABILITY BY CREATING NEW STATE OBJECT
  let newCanDataObject = this.state.data

  // SANITY CHECK FOR STATE !! CREATES BOOLEAN OF VARIABLE
  console.log(!!newCanDataObject);

  return newCanDataObject.map((can, index)=>{


    return(

        <div key={index}>


          <DisplayCard>

             <DisplayTitle >

              <h3>Name: {can.name}</h3>

            </DisplayTitle>

            <DisplayContent>

              <p>Serial#: {can.serial}</p>
              <p>Size: {can.size}</p>
              <p>Created On: {moment(can.createdDate).format("MMM Do YY hh:mm a")}</p>
              <p>Modified On: {moment(can.modifiedDate).format("MMM Do YY hh:mm a")}</p>

            </DisplayContent>

            <hr />

          </DisplayCard>


        </div>

      )
  })

}




  render() {

    return (

      <div className="container">
         {/* CREATE SIDE BAR WITH MULTIPLE FILTERS + LOCATION/DISATNCE */}

        {/*  CREATE MAP VIEW/ROUTE BASED ON LOCATIONS */}


        <h1>Can data</h1>
        <Row>

          <Col xs={3}>
            <DropdownButton
              title="Sort By:"
              id="dropdown-size-large"
            >
              <MenuItem eventKey="1" onClick={ () => this.sortData('size') } >Size</MenuItem>
              <MenuItem eventKey="2" onClick={ () => this.sortData('createdDate') }>Date Created</MenuItem>
              <MenuItem eventKey="3" onClick={ () => this.sortData('modifiedDate') }>Date Modified</MenuItem>

            </DropdownButton>


          </Col>

          <Col xs={9} >


             {/* ADD PAGINATION 10 PER PAGE */}
            {this.dataMap()}

          </Col>

        </Row>
      </div>

    )


  }
}

export default DataDisplay
