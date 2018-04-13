import React from 'react'

import {
  Row , Col ,
  DropdownButton , MenuItem ,
  Glyphicon, Button ,
  // FormGroup , FormControl ,
  ControlLabel ,
  // Checkbox
} from 'react-bootstrap'

import styled from 'styled-components';

const SidebarStyle = styled.div`
  padding: 2em;
`;

const Padding = styled.div`
  padding-bottom: 3em;
`;



class Sidebar extends React.Component {

// DROP DOWN CREATOR
  sortDropdown() {
    return (
      <div>
        <ControlLabel>Sort List</ControlLabel>
        <Row className='container-fluid'>

          <Col xs={12}>

            <DropdownButton
              title="Sort By:"
              id="dropdown-size-large"
            >
              <MenuItem eventKey="1" onClick={ () => this.props.sort('size') } >Size</MenuItem>
              <MenuItem eventKey="2" onClick={ () => this.props.sort('createdDate') }>Date Created</MenuItem>
              <MenuItem eventKey="3" onClick={ () => this.props.sort('modifiedDate') }>Date Modified</MenuItem>

            </DropdownButton>

          </Col>

          <Col xs={12}>
            <Padding></Padding>
            <Button onClick={this.props.sortOrder}>
              <Glyphicon glyph="sort" />
            </Button>
          </Col>
        </Row>
      </div>

    )
  }

  render() {


    return (
      <SidebarStyle>

        <Padding></Padding>
        <Padding></Padding>


        {this.sortDropdown()}

        <Padding></Padding>


        <Button onClick={this.props.fetch}>
            Reload List
        </Button>

      </SidebarStyle>
    )
  }
}

export default Sidebar
