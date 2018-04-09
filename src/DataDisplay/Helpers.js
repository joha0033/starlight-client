export async function GetData() {

  let BaseURL;
  
  process.env.NODE_ENV === 'development'
  ? BaseURL ='http://localhost:5000/data/cans'
  : BaseURL ='https://starlight-server-challenge.herokuapp.com/data/cans'

    let response = await fetch(BaseURL, {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET',
        mode: 'cors'
      })

      if(response.status === 200){
        return response.json()
      }

      //if respones is shit, throw error
      throw new Error(response.status);

  }
