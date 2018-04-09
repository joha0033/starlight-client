import React from 'react'
import { GetData } from './Helpers'
import moment from 'moment'

class DataDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    GetData().then((results) => {

      this.setState({data: results}, () => {
        // add data to page!
        console.log(this.state.data);
      })

    })
  }


  // DISPLAYS ALL CAN
  dataMap() {
  console.log('dataMap');

  // KEEP IMMUTABILITY BY CREATING NEW STATE OBJECT
  let newCanDataObject = this.state.data

  // SANITY CHECK FOR STATE !! CREATES BOOLEAN OF VARIABLE
  console.log(!!newCanDataObject);
  // let createdDate = '2017-11-07T18:47:53.162Z'
  // let formattedDate = moment(createdDate).format("MMM Do YY hh:mm a")
  // console.log(formattedDate);
  return newCanDataObject.map((can, index)=>{

    console.log(can.location);
    console.log(can.prevLocation);

    return(<div key={index}>
            <h3>Name: {can.name}</h3>
            <p>Serial#: {can.serial}</p>
            <p>Size: {can.size}</p>
            <p>Created On: {moment(can.createdDate).format("MMM Do YY hh:mm a")}</p>
            <p>Modified On: {moment(can.modifiedDate).format("MMM Do YY hh:mm a")}</p>
          </div>)
  })

}




  render() {

    return (

      <div>

        <h1>Can data</h1>
        {this.dataMap()}

      </div>

    )


  }
}

export default DataDisplay
