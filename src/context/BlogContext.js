import createDataContext from "./createDataContext";
import _ from "lodash";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: _.uniqueId("blog_id_"),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    case "delete_blogpost":
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({ type: "add_blogpost", payload: { title, content } });
    callback();
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  [
    {
      title: "Test Post",
      content:
        "Cornhole chambray truffaut craft beer bushwick food truck ugh asymmetrical cold-pressed. Green juice ennui edison bulb distillery sustainable vape, viral lomo letterpress bicycle rights photo booth wayfarers leggings kombucha master cleanse. Flannel air plant distillery hoodie umami. Mlkshk fam la croix, four dollar toast swag tumeric leggings next level messenger bag. Sriracha actually iceland small batch live-edge succulents cornhole ethical. Tumeric VHS affogato listicle, glossier you probably haven't heard of them live-edge selvage. Yr truffaut beard, tumeric pok pok vinyl art party synth. \n\nTaiyaki leggings mixtape skateboard cardigan pop-up +1. Helvetica skateboard cornhole cray, kitsch 3 wolf moon single-origin coffee bushwick pinterest. Craft beer farm-to-table glossier fixie, palo santo thundercats irony venmo. Roof party VHS shaman readymade snackwave. Kickstarter meditation live-edge mlkshk messenger bag. Meggings shabby chic vice, dreamcatcher drinking vinegar palo santo pug chicharrones literally bicycle rights vexillologist ennui butcher before they sold out four loko.",
      id: "1"
    }
  ]
);
