
const hostname = window.location.hostname;

export const API_BASE_URL = hostname === 'localhost' 
  ? 'http://localhost:8080'  // Development URL
  : 'http://13.42.103.58';    // Production URL