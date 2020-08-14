import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Context } from "../context/BlogContext";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(post => post.id === navigation.getParam("id"));
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = () => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.editIcon}
        onPress={() => navigation.navigate("Edit")}
      >
        <FontAwesome name='pencil' size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  editIcon: {
    marginRight: 8
  }
});

export default ShowScreen;
