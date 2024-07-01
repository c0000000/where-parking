import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
    </Stack>
  );
};

export default StackLayout;
