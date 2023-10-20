import { Container, Stack } from "@mui/material"
import "./App.css"
import TypescriptLogo from "./assets/typescript.svg"
import { Start } from "./Start"
import { useQuestionsStore } from "./store/questions"
import { Game } from "./Game"

function App() {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img src={TypescriptLogo} alt="Typescript Logo" width={50} />
          <h1>Typescript Quizz</h1>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
