import axios from "axios";
import { SERVER } from "../../globalVar";

/**
 * Sends an order request to the server.
 *
 * @param {Object} creds - The order details.
 */
export function sendOrder(creds:any) {
  console.log(creds);
  return new Promise<{ data: any }>((resolve) =>
    axios
      .post(SERVER + "order", creds, {headers:{"content-type": "application/json",'Authorization': `Bearer ${localStorage.getItem('axx')}`
    } })
      .then((res) => resolve({ data: res.data }))
  );
}
