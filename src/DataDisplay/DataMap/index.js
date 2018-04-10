import React from 'react'
import styled from 'styled-components';
import moment from 'moment'

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

class DataMap extends React.Component {



  dataMap() {
  // console.log('dataMap');

  // KEEP IMMUTABILITY BY CREATING NEW STATE OBJECT
  let newCanDataObject = this.props.data

  // SANITY CHECK FOR STATE !! CREATES BOOLEAN OF VARIABLE
  // console.log(!!newCanDataObject);

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

    return(
      <div>
        {this.dataMap()}
      </div>

    )
  }



}

export default DataMap
