const storage = localStorage || window.localStorage;
const sessionStr = sessionStorage || window.sessionStorage;
const storageAccessToken = 'AccessToken';
const storageRefreshToken = 'RefreshToken';
const storageUserRole = 'Roles';
const storageUserInformation = 'Information';
let accessToken = null;

/*
| SET access token
| -----------------------------
| @param string token
| @param boolean onlySession
*/
export const setAccessToken = (tokenString, onlySession = false) => {
  try {
    if (storage) {
      if (tokenString) {
        if (onlySession) {
          sessionStr.setItem(storageAccessToken, tokenString);
        } else {
          storage.setItem(storageAccessToken, tokenString);
        }
      } else {
        storage.removeItem(storageAccessToken);
        sessionStr.removeItem(storageAccessToken);
      }
      accessToken = tokenString;
    }
  } catch (error) {
    // console.log('services.User.token.setAccessToken() - ', error);
  }
};

/*
| GET access token
| -----------------------------
| @return string
*/
export const getAccessToken = () => {
  try {
    if (accessToken) {
      return accessToken;
    } if (storage) {
      accessToken = storage.getItem(storageAccessToken);
      return accessToken;
    }
    return null;
  } catch (error) {
    // console.log('services.User.token.getAccessToken() - ', error);
    return error;
  }
};

/*
| SET refresh token
| -----------------------------
| @param string refreshToken
| @param boolean onlySession
*/
export function setRefreshToken(refreshToken, onlySession = false) {
  if (storage) {
    if (refreshToken) {
      const infoString = JSON.stringify(refreshToken);
      if (onlySession) {
        sessionStr.setItem(storageRefreshToken, infoString);
      } else {
        storage.setItem(storageRefreshToken, infoString);
      }
    } else {
      storage.removeItem(storageRefreshToken);
      sessionStr.removeItem(storageRefreshToken);
    }
  }
}

/*
| GET refresh token
| -----------------------------
| @return string
*/
export function getRefreshToken() {
  if (storage) {
    const refreshToken = storage.getItem(storageRefreshToken) || {};
    return JSON.parse(refreshToken);
  }
  return null;
}

/*
| SET role's user
| -----------------------------
| @param array roles
| @param boolean onlySession
*/
export function setUserRole(roles, onlySession = false) {
  if (storage) {
    if (roles) {
      const infoString = JSON.stringify(roles);
      if (onlySession) {
        sessionStr.setItem(storageUserRole, infoString);
      } else {
        storage.setItem(storageUserRole, infoString);
      }
    } else {
      storage.removeItem(storageUserRole);
      sessionStr.removeItem(storageUserRole);
    }
  }
}
/*
| GET role's user
| -----------------------------
| @return string
*/
export function getUserRole() {
  if (storage) {
    const userRole = storage.getItem(storageUserRole) || {};
    return JSON.parse(userRole);
  }
  return null;
}

/*
| SET user's information
| -----------------------------
| @param object user
| @param boolean onlySession
*/
export function setUserInformation(user, onlySession = false) {
  if (storage) {
    if (user) {
      const infoString = JSON.stringify(user);
      if (onlySession) {
        sessionStr.setItem(storageUserInformation, infoString);
      } else {
        storage.setItem(storageUserInformation, infoString);
      }
    } else {
      storage.removeItem(storageUserInformation);
      sessionStr.removeItem(storageUserInformation);
    }
  }
}
/*
| GET user's information
| -----------------------------
| @return object
*/
export function getUserInformation() {
  if (storage) {
    const userInformation = storage.getItem(storageUserInformation) || {};
    return JSON.parse(userInformation);
  }
  return null;
}
