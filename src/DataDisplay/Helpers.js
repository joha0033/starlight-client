export const GetDataHelper = async () => {

  let BaseURL;

  // SWITCH URLS FOR CERTAIN ENVS
  process.env.NODE_ENV === 'development'
  ? BaseURL ='http://localhost:5000/data/cans'
  : BaseURL ='https://starlight-server-challenge.herokuapp.com/data/cans'

    // SET UP GET FETCH
    let response = await fetch(BaseURL, {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET',
        mode: 'cors'
      })

      // IF THERE IS A SUCCESSFUL RESPONSE
      if(response.status === 200){
        return response.json()
      }

      //if respones is shit, throw error
      throw new Error(response.status);

  }




  export const SortHelper = (descending, type, stateArray) => {

    // CREATE NEW ARRAY
    let array = stateArray;

    // NO TYPE, REVERSE EXISTING LIST
    if(type === ''){
      return array.reverse()
    }

    // CHECK IF THE DATA BEING COMPARED IS A DATE.
    const dateCheck = (data) =>{
      return !type.includes('Date') // IF TYPE DOES NOT INCLUED DATE
        ? data = ~~data[type]// BITWISE~~ CONVERTS TO INT
        : data = new Date(data[type])  // CONVERT ARGS TO DATE
    }

    // COMPARE DATA FOR SORTING
    array.sort((a, b) =>{
      a = dateCheck(a) // DATE CHECK
      b = dateCheck(b)
      return  descending // BOOLEAN VALUE FOR SORT DIRECTION
        ? (a > b ? 1 : a < b ? -1 : 0)
        : (a < b ? 1 : a > b ? -1 : 0)
        // : array = array.reverse() <--CHEAPER FOR SORT TOGGLE??
    })

    // RETURN NEW LIST
    return array
  }




  export const PageHelper = (state) => {

    // GRAB DATA FROM STATE
    let { itemsPerPage, masterData } = state

    // CREATE ARRAY TO SEND
    const pageNumbers = [];

    // INTERATE THE LENGTH OF DATA TO CREATE PAGES
    for (let i = 1; i <= Math.ceil(masterData.length / itemsPerPage); i++) {

      pageNumbers.push(i);

    }

    // SEND FILLED ARRAY
    return pageNumbers

  }





  export const SplitDataHelper = (state) => {

    // QUICK HELPER TO CRATE SPLIT DATA FOR EAHC PAGE
    const { currentPage, itemsPerPage, masterData } = state

    // PAGE LOGIC FOR EACH PAGE'S LIST
    const indexOfLastData = currentPage * itemsPerPage;
    const indexOfFirstData = indexOfLastData - itemsPerPage;

    // RETURN THE SHORTENED LIST
    return masterData.slice(indexOfFirstData, indexOfLastData);


  }
