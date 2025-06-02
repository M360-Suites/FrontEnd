// Set a cookie with options
export const setCookie = (name, value, options = {}) => {
  const defaults = {
    path: '/',
    sameSite: 'lax', 
    secure: window.location.protocol === 'https:',
    maxAge: 30 * 24 * 60 * 60 // 30 days by default
  };
  
  const cookieOptions = { ...defaults, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  for (const optionKey in cookieOptions) {
    if (cookieOptions[optionKey] === true) {
      cookieString += `; ${optionKey}`;
    } else if (cookieOptions[optionKey] !== false && optionKey !== 'maxAge') {
      cookieString += `; ${optionKey}=${cookieOptions[optionKey]}`;
    }
  }
  
  if (cookieOptions.maxAge) {
    cookieString += `; max-age=${cookieOptions.maxAge}`;
  }
  
  document.cookie = cookieString;
  console.log(`Cookie set: ${name}`); // Debug log
};

// Get a cookie by name
export const getCookie = (name) => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      const value = decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      console.log(`Cookie retrieved: ${name}=${value ? '[exists]' : '[empty]'}`); // Debug log
      return value;
    }
  }
  console.log(`Cookie not found: ${name}`); // Debug log
  return null;
};

// Remove a cookie
export const removeCookie = (name) => {
  setCookie(name, '', { maxAge: -1 });
  console.log(`Cookie removed: ${name}`); // Debug log
};
