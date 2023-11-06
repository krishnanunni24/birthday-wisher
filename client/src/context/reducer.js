export const initialState = {
  form1Data: {},
  form2Data: {},
  form3Data: {},
  lyrics: null,
  wholeFormData: {},
  audioUrl: null,
  userData: {},
};

export const formDataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM1":
      return { ...state, form1Data: action.payload };
    case "UPDATE_FORM2":
      return { ...state, form2Data: action.payload };
    case "UPDATE_FORM3":
      return { ...state, form3Data: action.payload };
    case "UPDATE_WHOLE_FORM_DATA":
      return { ...state, wholeFormData: action.payload };
    case "UPDATE_LYRICS":
      return { ...state, lyrics: action.payload };
    case "UPDATE_AUDIO_URL":
      return { ...state, audioUrl: action.payload };
    case "lOGGED_IN":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
