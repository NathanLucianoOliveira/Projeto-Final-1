import StackComponent from "./src/routes/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackComponent />
    </GestureHandlerRootView>
  );
}