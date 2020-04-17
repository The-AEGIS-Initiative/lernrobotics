/** Socket emit functions
 * @module sockets/emit
 */

import { socket } from '../App';

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
    socket.emit('submitUserCode', { client_id: sessionStorage['client_id'],
                                    data: userCode });
}

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
  socket.emit('stopUserCode', { client_id: sessionStorage['client_id'] });
}
