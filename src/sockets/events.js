/** Socket emit functions
 * @module sockets/events
 */

import { socket } from '../App';

/**
 * Listen for client connection initialization event
 * @function
 * @memberof module:sockets/events
 */
export const registerInitEvent = () => {
	socket.on("init", (data) => {
		console.log(`Assigned client ID: ${data.clientID}`)
		console.log(`Assigned game server url: ${data.gameServerUrl}`)
		
		// Store assigned client ID and port in browser sessionStorage
		// sessionStorage is wiped when webpage is closed
		sessionStorage.setItem('client ID', data.clientID);
		sessionStorage.setItem('gameServerUrl', data.gameServerUrl);
		
	});

	console.log("Client is listening for init events");
}