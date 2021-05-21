export const currentindex = (
  state = 0,
  action: { payload: number; type: string }
) => {
  switch (action.type) {
    case "currentindex":
      return action.payload;
    default:
      return state;
  }
};

export const editbackdrop = (
  state = false,
  action: { payload: boolean; type: string }
) => {
  switch (action.type) {
    case "editbackdrop":
      return action.payload;
    default:
      return state;
  }
};

export const editdetails = (
  state = {
    bio: "Akshay Murari ✈Landed on Mar:1 ✈dhf:RAINA ✈Is google a boy or a girl? Obviously,it is a girl because it wont let u finish ur sentence without suggesting other ideas",
  },
  action: { payload: { bio: string }; type: string }
) => {
  switch (action.type) {
    case "editdetails":
      return action.payload;
    default:
      return state;
  }
};

export const profilepic = (
  state = "",
  action: { payload: ""; type: string }
) => {
  switch (action.type) {
    case "profilepic":
      return action.payload;
    default:
      return state;
  }
};

export const addbackdrop = (
  state = false,
  action: { payload: boolean; type: string }
) => {
  switch (action.type) {
    case "addbackdrop":
      return action.payload;
    default:
      return state;
  }
};

// type mypoststype = ({
//   pic: string,
//   tagline: string
// })

export const myposts = (
  state: ({
    pic: string,
    tagline: string,
    id:number
  })[] = [],
  action: { payload: ({
    pic: string,
    tagline: string,
    id:number
  })[]; type: string }
) => {
  switch (action.type) {
    case "myposts":
      return action.payload;
    default:
      return state;
  }
};


export const postpic = (
  state = "",
  action: { payload: ""; type: string }
) => {
  switch (action.type) {
    case "postpic":
      return action.payload;
    default:
      return state;
  }
};

export const onsearch = (
  state = [],
  action: { payload: [], type: string }
) => {
  switch (action.type) {
    case "onsearch":
      return action.payload;
    default:
      return state;
  }
};

export const currentprofile = (
  state = {},
  action: { payload: {}, type: string }
) => {
  switch (action.type) {
    case "currentprofile":
      return action.payload;
    default:
      return state;
  }
};

