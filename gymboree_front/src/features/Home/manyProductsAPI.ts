import axios from "axios";
import { SERVER } from "../../globalVar";

/**
 * Function to add a product by sending a POST request with image.
 * @param creds - Product details including image file.
 * @returns A promise with the response data.
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
 * Function to get all products.
 * @param allProducts - If true, retrieves all products; otherwise, retrieves paginated products.
 * @returns A promise with the response data.
 */
  export function getAllProducts(allProducts = false) {
    const url = allProducts ? `${SERVER}myProducts?all=true` : `${SERVER}myProducts`;
    return new Promise<{ data: any }>((resolve) =>
      axios.get(url).then((res) => resolve({ data: res.data }))
    );
  }
  
/**
 * Function to get next set of paginated products.
 * @param creds - URL for retrieving the next set of products.
 * @returns A promise with the response data.
 */
  export function getNextProds(creds:string) {
    return new Promise<{ data: any }>((resolve) =>
    axios.get(creds)
        .then((res) => resolve({ data: res.data }))
    );
  }