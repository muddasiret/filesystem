import React from "react";
import { BASE_URL } from "../helpers/API";
import axios from "axios";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  getFiles,
  addUser,
  downloadFile
};

// ###########################################################
function handleError(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    alert("User session expired.Please login again");
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_name");
    window.location.href = "/login";
  }
}

function loginUser(
  dispatch,
  login,
  password,
  admin,
  history,
  setIsLoading,
  setError,
) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    let apiUrl = admin
      ? BASE_URL + "/auth/admin/login"
      : BASE_URL + "/auth/users/login";
    axios
      .post(apiUrl, {
        username: login,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("user_name", login);
        localStorage.setItem("user_type", admin ? "admin" : "normal");
        localStorage.setItem("id_token", response.data.token);
        setError(null);
        setIsLoading(false);
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      });
    setTimeout(() => {
      history.push("/app/dashboard");
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function getFiles(setFiles) {
  let token = localStorage.getItem("id_token");
  let userType = localStorage.getItem("user_type");
  if (userType !== "admin") {
    axios
      .get(BASE_URL + "/auth/users/accessfiles", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(function (response) {
        console.log(response);
        setFiles(response.data.access_file)
      })
      .catch(function (error) {
        console.log(error);
        handleError(error);
      });
  } else {
    axios
      .get(BASE_URL + "/all-files", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(function (response) {
        console.log(response);
        setFiles(response.data.files);
      })
      .catch(function (error) {
        handleError(error);
      });
  }
}

function addUser(name, pwd, files) {
  let filestring = files.join("|");
  let token = localStorage.getItem("id_token");
  let axiosConfig = {
    headers: {
      "x-auth-token": token
    }
  };
  let postData={
    username: name,
    password: pwd,
    expiry_date: "26-2-2",
    access_file: filestring,
    admin_id: "1",
  }
  axios.post(BASE_URL + "/auth/users/signup", postData, axiosConfig)
    .then(function (response) {
      console.log(response);
      alert("User added")
    })
    .catch(function (error) {
      console.log(error);
    });
}

function downloadFile(file) {
  let token = localStorage.getItem("id_token");
  let axiosConfig = {
    headers: {
      "x-auth-token": token
    }
  };
  // let postData={
  //   "filename_download": file
  // }
  axios.get(BASE_URL + "/download_test?filename="+file,axiosConfig)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}