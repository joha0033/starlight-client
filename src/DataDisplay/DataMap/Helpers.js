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


const handlePages = (event) => {
  this.setState({
        currentPage: Number(event)
      });
}

export const Pagination = (dataObject, state) => {
  console.log('hit page');

  const { currentPage, itemsPerPage } = state
  console.log(currentPage, itemsPerPage);

  let dataList = dataObject
  console.log(dataList);

  // Logic for displaying current todos
  console.log(currentPage, itemsPerPage);

  const indexOfLastData = currentPage * itemsPerPage;
  const indexOfFirstData = indexOfLastData - itemsPerPage;
  console.log(indexOfFirstData, indexOfLastData);

  const currentDatas = dataList.slice(indexOfFirstData, indexOfLastData);
  console.log(currentDatas);

  const renderDatas = currentDatas.map((can, index) => {
    console.log('renderDatas hit');
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

      });

  // Logic for displaying page numbers
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(dataList.length / itemsPerPage); i++) {

    pageNumbers.push(i);

  }

  const renderPageNumbers = pageNumbers.map(number => {
     return (
       <li
         key={number}
         id={number}
         onClick={(event) => this.handlePages(event.target.id)}
       >
         {number}
       </li>
     );
   });
}
