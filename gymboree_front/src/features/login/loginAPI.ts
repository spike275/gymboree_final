import axios from "axios";
import {SERVER} from "../../globalVar"

/**
 * Function to authenticate a user by sending a login request.
 * @param creds - User credentials including username and password.
 * @returns Promise that resolves with the response data or rejects with an error.
 */
export function userFetch(creds:any) {
    return new Promise<{ data: any }>((resolve,reject) =>
      axios
        .post(SERVER+ "login", { username:creds.username, password:creds.password })
        .then((res) => resolve({ data: res.data }))      
        .catch((error)=>reject(error.data))

    );
  }

/**
 * Function to register a new user.
 * @param creds - User registration details including username, password, address, phone number, and email.
 * @returns Promise that resolves with the response data if registration is successful or rejects with an error.
 */
export function userRegister(creds:any) {
  return new Promise<{ data: any }>((resolve,reject) =>
    axios
      .post(SERVER+ "register", { username:creds.username, password:creds.password,address:creds.address,phone_number:creds.phone_number,email:creds.email })
      .then((res) => resolve({ data: res.data }))
      .catch((error)=>  reject(error.response.data))
  );
}
  /**
 * Function to refresh a user's authentication token.
 * @param refresh - Refresh token for the user's session.
 * @returns Promise that resolves with the refreshed token data.
 */
  export function refreshUser(refresh:any) {
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER+ "refresh", { refresh })
        .then((res) => resolve({ data: res.data }))
        .catch((error)=>console.log(error))
    );
  }
  /**
 * Function to log out a user.
 * @param refresh - Refresh token for the user's session.
 * @returns Promise that resolves with the response data after logging the user out.
 */
  export function logoutUser(refresh:any) {
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER+ "logout", { refresh })
        .then((res) => resolve({ data: res.data }))
    );
  }
