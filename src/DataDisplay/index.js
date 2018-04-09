import React from 'react'
import { GetData } from './Helpers'
import moment from 'moment'
import styled from 'styled-components';


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



class DataDisplay extends React.Component {

  constructor(props){

    super(props)

    this.state = {
      data: []
    }

    this.fetchData = this.fetchData.bind(this)
    this.dataMap = this.dataMap.bind(this)
    this.sortData = this.sortData.bind(this)

  }


  componentWillMount() {

    this.fetchData()

  }


  fetchData() {

    GetData().then((results) => {

      this.setState({data: results}, () => {

        // SNAG LOCATION AND CONVERT WITH GOOGLE API
        console.log('data set? ', !!this.state.data);

      })

    })
  }


  sortData() {
    console.log('sort hit!');
    let sortedArray = this.state.data
    sortedArray.sort((a, b) => {
      return b.size - a.size
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

      <div>

        {/*  CREATE SIDE BAR WITH MULTIPLE FILTERS + LOCATION/DISATNCE*/}
        <button onClick={()=>this.sortData()}>sort</button>
        <button onClick={()=>this.fetchData()}>unsort</button>

        {/*  CREATE MAP VIEW/ROUTE BASED ON LOCATIONS */}

        <h1>Can data</h1>
        {/*  ADD PAGINATION 10 PER PAGE*/}
        {this.dataMap()}

      </div>

    )


  }
}

export default DataDisplay
