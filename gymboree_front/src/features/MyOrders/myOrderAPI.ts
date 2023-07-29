import axios from "axios";
import { SERVER } from "../../globalVar";


  export function getOrders() {
    return new Promise<{ data: any }>((resolve) =>
    axios
        .get(SERVER + "orders", {headers:{'Authorization': `Bearer ${localStorage.getItem('axx')}`
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }




