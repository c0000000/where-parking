import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar, Icon } from "react-native-elements";

const SearchComponent = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Cerca..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        inputStyle={{ color: "#000" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

export default SearchComponent;
