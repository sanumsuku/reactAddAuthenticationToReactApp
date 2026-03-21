import { redirect } from "react-router-dom";
export const setAuthToken = (token) => {
     localStorage.setItem('react-sec-23-event-app-token',token);
     const expiration = new Date();

     expiration.setHours(expiration.getHours() + 1); // add 1 hr

     // expiration.setMinutes(expiration.getMinutes() + 1); // add 1 minutes

     localStorage.setItem('react-sec-23-event-app-token-expiry',expiration.toISOString());
     return;
}

export const getTokenDuration = () => {
     const storedExpirationDate = localStorage.getItem('react-sec-23-event-app-token-expiry');
     const expirationDate = new Date(storedExpirationDate);
     const now = new Date();
     const duration = expirationDate.getTime() - now.getTime();
     return duration;
}

export const getAuthToken = () => {
     const token = localStorage.getItem('react-sec-23-event-app-token');

     if(!token){
          return null;
     }

     const tokenDuration = getTokenDuration();

     if(tokenDuration < 0){
          // return 'EXPIRED';
          clearAuthToken();
          return null;
     }

     return token;
}

export const clearAuthToken = () => {
     // localStorage.clear('react-sec-23-event-app-token');
     // return redirect('/auth');
     localStorage.removeItem('react-sec-23-event-app-token');
     localStorage.removeItem('react-sec-23-event-app-token-expiry');
     return;

}

export const isLoggedIn = () => {
     return getAuthToken()?true:false;
}

export function checkAuthLoader() {
	// this function will be added in the next lecture
	// make sure it looks like this in the end
	const token = getAuthToken();
	
	if (!token) {
	     return redirect('/auth');
	}
	 

	return null; 
     // this is missing in the next lecture 			video and should be added by you
}
