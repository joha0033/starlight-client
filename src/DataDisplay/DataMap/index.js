import React from 'react'
import styled from 'styled-components';
import moment from 'moment'
import { Pagination} from 'react-bootstrap'

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
  constructor(props){
    super(props)
    this.state = {
      itemsPerPage: 6,
      currentPage: 1
    }
  }

  handlePages(event) {
    this.setState({
          currentPage: Number(event)
        });
  }

  dataMap() {
  // console.log('dataMap');

  // KEEP IMMUTABILITY BY CREATING NEW STATE OBJECT
  let dataObject = this.props.data

  const { currentPage, itemsPerPage } = this.state

  const indexOfLastData = currentPage * itemsPerPage;
  const indexOfFirstData = indexOfLastData - itemsPerPage;

  console.log(indexOfFirstData, indexOfLastData);

  const currentDatas = dataObject.slice(indexOfFirstData, indexOfLastData);
  console.log(currentDatas);

  // SANITY CHECK FOR STATE !! CREATES BOOLEAN OF VARIABLE
  // console.log(!!newCanDataObject);


  // ADD PAGINATION LOGIC HERE???

  // return dataObject.map((can, index)=>{
  let dataToRender = currentDatas.map((can, index)=>{

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

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dataObject.length / itemsPerPage); i++) {

      pageNumbers.push(i);

    }

    const renderPageNumbers = pageNumbers.map(number => {
      console.log(number);
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

     return (
       <div>
         <div>

           {dataToRender}

         </div>
         <div>
           <Pagination bsSize="medium">{renderPageNumbers}</Pagination>


         </div>

       </div>
     )
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
