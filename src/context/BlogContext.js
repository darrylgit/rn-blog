import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost":
      return state.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
    case "delete_blogpost":
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });

    callback && callback();
  };
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    callback && callback();
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
