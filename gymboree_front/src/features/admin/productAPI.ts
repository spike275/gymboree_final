import axios from "axios";
import { SERVER } from "../../globalVar";


/**
 * Sends a request to add a new product to the server.
 *
 * @param {Object} creds - The product information to be added.
 * @returns {Promise<{ data: any }>} - A promise containing the response data.
 */
export function addProdFetch(creds:any) {
    console.log(creds);
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER + "upload_image/", creds, {headers:{"content-type": "multipart/form-data",
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }
  

/**
 * Fetches all products from the server.
 */
  export function getAllProducts() {
    return new Promise<{ data: any }>((resolve) =>
    axios.get(SERVER + "myProducts")
        .then((res) => resolve({ data: res.data }))
    );
  }
 

/**
 * Sends a request to remove a product from the server.
 *
 * @param {string} creds - The ID of the product to be removed.
 */
  export function rmv_prod(creds:any) {
    return new Promise<{ data: any }>((resolve) =>
    axios.delete(SERVER + `myProducts/${creds}`)
        .then((res) => resolve({ data: res.data }))
    );
  }
