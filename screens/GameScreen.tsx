import React, { useState, useEffect } from "react";
import { ReactElement } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { AlertButton } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary: number = 1;
let maxBoundary: number = 100;

function GameScreen(props: {
  userNumber: number;
  onGameOver: (roundNumber: number) => void;
  onStartNewGame: () => void;
}): ReactElement {
  const initialGuess: number = GenerateRundomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(guessRoundsListLength);
    }
  }, [currentGuess, props.userNumber, props.onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function NextGuessHandle(direction: Direction): void {
    if (
      (direction == Direction.Lower && currentGuess < props.userNumber) ||
      (direction == Direction.Greater && currentGuess > props.userNumber)
    ) {
      Alert.alert("Dont't lit!", "You know that is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ] as AlertButton[]);
      return;
    }

    if (direction == Direction.Lower) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    var newRndNmber = GenerateRundomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNmber);
    setGuessRounds((prev: number[]) => [newRndNmber, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content: ReactElement = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => NextGuessHandle(Direction.Lower)}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => NextGuessHandle(Direction.Greater)}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => NextGuessHandle(Direction.Lower)}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => NextGuessHandle(Direction.Greater)}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound: number) => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData): ReactElement => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    // marginTop: 100,
    alignItems: "center",
  },
  InstructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

function GenerateRundomBetween(
  min: number,
  max: number,
  exclude: number
): number {
  const rndNum: number = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum == exclude) {
    return GenerateRundomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

enum Direction {
  Lower,
  Greater,
}

export default GameScreen;
