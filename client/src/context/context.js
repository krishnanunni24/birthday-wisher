import { createContext, useContext, useReducer } from "react";

export const FormDataContext = createContext();



export const useFormData = () => useContext(FormDataContext);
