import React, { Component } from 'react'
import styled from 'styled-components';
import moment from 'moment'

// HELPERS
import {
  GetDataHelper, SortHelper,
  PageHelper, SplitDataHelper,
  GetDistanceHelper, GetLocationHelper } from './Helpers'

// COMPONENTS
import Sidebar from './Sidebar'
import SimpleMap from './Map'


// STYLES
import { Row , Col } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap'

if ("geolocation" in navigator) {
  console.log('geoLocal available');
} else {
  console.log('geoLocal is not available');
}

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

const PaginationPadding = styled.div `
  padding-right: 10em;
`;


class DataDisplay extends Component {

  constructor(props){

    super(props)

    this.state = {
      location: {},
      masterData: [],
      sortedData:[],
      descending: false,
      sortType: '',
      itemsPerPage: 6,
      currentPage: 1

    }

    this.fetchData = this.fetchData.bind(this)
    this.sortOrder = this.sortOrder.bind(this)
    this.sortData = this.sortData.bind(this)
    this.location = this.location.bind(this)


  }

  componentDidMount() {
    this.fetchData()
  }
  // CALL FETCH WHEN COMPONENT MOUNTS


  location() {

    GetLocationHelper().then((results) => {
      console.log('results--------------',results);
      
      this.setState({
        location: {
          lat: results.location.lat,
          lng: results.location.lng
        }
    }, () => {
      this.dataMap()
      console.log("getCurrentPosition Success " + results.location.lat + results.location.lng) // logs position correctly
    })
      return console.log(this.state.location);

    })

  }


  // FETCH CAN JSON DATA AND SET STATE
  fetchData() {

    // CALL TO HELPER FUNCTION FOR FETCH
    GetDataHelper().then((results) => {

      // SET STATE PLUS CALLBACK FOR IMMMEADIATE SET AND CHECK
      return this.setState({masterData: results}, () => {

        // sanity check for data set
        return console.log('data set?', !!this.state.masterData[0] !== undefined, 'length:',this.state.masterData.length)

      })

    })


}




  // TOGGLE SORT ORDER
  sortOrder() {

    this.setState({descending: !this.state.descending}, () =>{

      // CALL SORT TO DISPLAY WITH NEW ORDER WITH CURRENT SORT TYPE
      return this.sortData(this.state.sortType)

    })
  }



  // SORT THE DATA BY TYPE
  sortData(type) {

    // CREATE A NEW ARRAY FROM STATE
    let array = this.state.masterData

    // CALL HELPER METHOD TO SORT ARRAY
    let sortedArray = SortHelper(this.state.descending, type, array)

    // SET SORT TYPE, USED IN SORTORDER FUNCTION
    this.setState({sortType: type})

    // RETURN SET STATE WITH A CALL BACK TO TRIGGER DATA MAP
    return this.setState({sortedData: sortedArray})

  }


  handlePages(event) {
    this.setState({
          currentPage: Number(event)
        });
  }



  //////////////////////////////////////////////////
  // MAPS DATA TO CREATE PAGINATION WITH SORTED DATA
  dataMap() {
    console.log('dataMap hit!', this.state.location);
    let currentData = SplitDataHelper(this.state)
    let distance, duration;
    ////////////////////////////////////
    // CREATES "PER PAGE" LIST TO RENDER
    // let dataToRender = currentData.map((can, index)=>{

    let dataToRender = currentData.map((can, index)=>{

      let oLat = this.state.location.lat
      let oLng = this.state.location.lng
      let dLat = can.location.location.lat
      let dLng = can.location.location.lon

      console.log(oLat, oLng);

      if(!!oLat || !!oLng){
        console.log('get distance?');
        GetDistanceHelper(oLat, oLng, dLat, dLng).then((results) =>{
          distance = results.distance
          duration = results.duration
          console.log(distance, duration);

        }).then(() => {
          // variable full

        })
      }
      console.log(distance, duration);
      return(

        <div key={index}>


          <DisplayCard>

             <DisplayTitle >



            </DisplayTitle>

            <DisplayContent>
              <Row>
                <Col xs={6}>
                  <h3>Name: {can.name}</h3>
                  <p>Serial#: {can.serial}</p>
                  <p>Size: {can.size}</p>
                  <p>Created On: {moment(can.createdDate).format("MMM Do YY hh:mm a")}</p>
                  <p>Modified On: {moment(can.modifiedDate).format("MMM Do YY hh:mm a")}</p>
                  <p>Current At: {can.location.name}</p>
                  {console.log(distance, duration)}
                  {/* {this.state.location.lat || this.state.}
                  <p>distance/duration: {distance} / {duration}</p> */}
                </Col>
                <Col xs={6}>
                  <h3>Location</h3>
                  <div style={{width: '200px', height: '150px'}}>
                    <SimpleMap
                    lat = {can.location.location.lat}
                    lng = {can.location.location.lon}
                    center = {can.location.location}
                  />
                  </div>
                  <a href= {'https://www.google.com/maps/?q=' + can.location.location.lat + ',' + can.location.location.lon}> directions from Gmaps</a>
                </Col>


              </Row>

            </DisplayContent>

            <hr />

          </DisplayCard>


        </div>
      )
    })

    ////////////////////////////////
    // HELPER TO CREATE PAGE NUMBERS ARRAY
    let pageNumbers = PageHelper(this.state)

    ////////////////////////////////
    // CREATES PAGINATION NAVIGATION
    const renderPageNumbers = pageNumbers.map(number => {

       return (
         <Pagination.Item
           key={number}
           id={number}
           active={number === this.state.currentPage}
           onClick={(event) => this.handlePages(event.target.id)}
         >
           {number}
         </Pagination.Item>
       );

    });

    /////////////////////////////////////
    // LIST TO RENDER LIST WITH PAGINATION
    return (
       <div>

         <div>
           <PaginationPadding>
             <Pagination bsSize="medium">{renderPageNumbers}</Pagination>
           </PaginationPadding>
         </div>
         <div>

           {dataToRender}

         </div>
         <div>
           <PaginationPadding>
             <Pagination bsSize="medium">{renderPageNumbers}</Pagination>
           </PaginationPadding>
         </div>

       </div>
    )

  }


  render() {
    const location = this.state.location


    return (

      <div >
        <h1>Can data</h1>
        <a onClick={this.location}> Set your current location </a>
        <div>
          {location.lat}
          <br/>
          {location.lng}
        </div>
        <Row className="container">

          <Col xs={3}>

            <Sidebar
              fetch = { this.fetchData }
              sort = {this.sortData}
              sortOrder = {this.sortOrder}
            />

          </Col>


          <Col xs={9}>

            {this.dataMap()}

          </Col>

        </Row>

      </div>

    )


  }
}

export default DataDisplay
