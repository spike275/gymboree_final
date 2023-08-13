import axios from "axios";
import { SERVER } from "../../globalVar";

  /**
 * Retrieves the user's orders from the server.
 * 
 * @returns {Promise<{ data: any }>} A promise that resolves to the response containing user's orders.
 */
  export function getOrders() {
    return new Promise<{ data: any }>((resolve) =>
    axios
        .get(SERVER + "orders", {headers:{'Authorization': `Bearer ${localStorage.getItem('axx')}`
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }




