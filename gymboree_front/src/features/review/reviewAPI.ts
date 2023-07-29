import axios from "axios";
import { SERVER } from "../../globalVar";


  export function getReviews() {
    return new Promise<{ data: any }>((resolve) =>
    axios
        .post(SERVER + "reviews",{headers:{'Authorization': `Bearer ${localStorage.getItem('axx')}`
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }


  export function sendNewReview(creds: any) {
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER + "createreview", {
          product: creds.product,
          rating: creds.rating,
          title: creds.title, // include the title field
          text: creds.text, // include the text field
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("axx")}`,
          },
        })
        .then((res) => resolve({ data: res.data }))
    );
  }
  
  





