import React, { createContext, useEffect, useReducer } from "react";
import { tournamentReducer } from "./reducer";
import axiosInstance from "../axios/axiosConfig";

export const context = createContext();

export const Context = ({ children }) => {
  const initialstate = {
    tournaments: [],
  };
  const [state, dispatch] = useReducer(tournamentReducer, initialstate);

  const fetchTournaments = async () => {
    try {
      const { data } = await axiosInstance("/tournaments");
      dispatch({ type: "FETCH_FROM_DB", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const value = { state, dispatch, fetchTournaments };

  return <context.Provider value={value}>{children}</context.Provider>;
};
