import {
  Box,
  Button,
  Spinner,
  Text,
  Stack,
  Link,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { fetchQuizQuestions, Difficulty, QuestionsState } from "./API";
import "./App.css";
import HeroSection from "./Components/HomePageCentered";
import QuestionCard from "./Components/QuestionCard";
import { FaGithub } from "react-icons/fa";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
type ClickHandler = () => void;
const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true); // by default gameover

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startTrivia: ClickHandler = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setuserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log(questions);
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setuserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  return (
    <div className="App">
      <HeroSection />
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <>
          <Center>
            <Stack
              direction={{ base: "column", sm: "row" }}
              w={{ base: "100%", sm: "auto" }}
              spacing={5}
            >
              <Button
                colorScheme="teal"
                variant="outline"
                rounded="md"
                size="lg"
                height="3.5rem"
                fontSize="1.2rem"
                onClick={startTrivia}
              >
                Get Started
              </Button>
              <Link href="https://github.com/SouravBandyopadhyay" isExternal>
                <Button
                  leftIcon={<FaGithub />}
                  colorScheme="gray"
                  variant="outline"
                  rounded="md"
                  size="lg"
                  height="3.5rem"
                  fontSize="1.2rem"
                >
                  Github
                </Button>
              </Link>
            </Stack>
          </Center>
        </>
      ) : null}

      {!gameOver ? (
        <Text fontSize="xl" fontWeight="bold" mb={4} color="orange.500">
          Score:&nbsp;{score}
        </Text>
      ) : null}
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      <Box>
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1} // as array statrt from 0
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
      </Box>
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <Button marginTop="5" onClick={nextQuestion}>
          Next Question
        </Button>
      ) : null}
    </div>
  );
}

export default App;
