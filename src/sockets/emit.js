/** Socket emit functions
 * @module sockets/emit
 */

import { socket } from "../index";

// Check for dangerous statements
// return true if safe
//        false if dangerous
const checkUserCode = (code) => {
  // Matches import statements
  // TODO: Check all import statements and ensure they are either numpy or AEGISCore
  /** const regex = /(import)\s+(\w+(?:\s*,\s*\w+)*)/;

  const result = regex.exec(code);
  console.log(result); */
  console.log(code);
  return true;
};

/**
 * Function to submit user code
 * @function
 * @memberof module:sockets/emit
 * @param {string} userCode User written code
 * @example <caption>Example usage of submitUserCode</caption>
 * <Button onClick={(userCode) => {
 *                     submitUserCode(userCode)
 *                 }}>
 *     Submit
 * </Button>
 */
export const submitUserCode = (userCode) => {
  console.log("User code submitted");
  if (checkUserCode(userCode)) {
    socket.emit("submitUserCode", {
      client_id: sessionStorage.client_id,
      data: userCode,
    });
  }
};

/**
 * Function to stop current running user code
 * @function
 * @memberof module:sockets/emit
 * @example <caption>Example usage of stopUserCode</caption>
 * <Button onClick={() => {
 *                     stopUserCode();
 *                 }}>
 *     Stop
 * </Button>
 */
export const stopUserCode = () => {
  console.log("User code stopped");
  socket.emit("stopUserCode", { client_id: sessionStorage.client_id });
};
