import React, { useState } from "react";
import { ReactElement } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./util/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App(): ReactElement {
  const [userNumber, setUserNumber] = useState<string | null>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  function startNewGameHandle() {
    setUserNumber(null);
    setGameIsOver(true);
    setGuessRounds(0);
  }

  function pickedNumberHandler(pickedNumber: string) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandle(roundNumber: number) {
    setGameIsOver(true);
    setGuessRounds(roundNumber);
  }

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let screen = <StartGameScreen onPuckNumber={(e) => pickedNumberHandler(e)} />;

  if (userNumber) {
    console.log(userNumber);
    screen = (
      <GameScreen
        userNumber={parseInt(userNumber)}
        onGameOver={gameOverHandle}
        onStartNewGame={startNewGameHandle}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={parseInt(userNumber)}
        roundsNumber={guessRounds}
        onStartGame={startNewGameHandle}
      />
    );
  }

  return (
    <>
      {/* <StatusBar
        barStyle="default"
        hidden={false}
        backgroundColor="#3b021f"
        translucent={true}
      /> */}
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgoundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgoundImage: {
    opacity: 0.15,
  },
});
