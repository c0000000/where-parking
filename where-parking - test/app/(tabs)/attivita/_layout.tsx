import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{ headerShown: false }}
        name="index"
      />
    </Stack>
  );
};

export default StackLayout;
