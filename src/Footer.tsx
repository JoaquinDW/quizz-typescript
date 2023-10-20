import { Button, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"

const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((el) => {
    if (el.userSelectedAnswer == null) unanswered++
    else if (el.userSelectedAnswer === el.correctAnswer) correct++
    else incorrect++
  })
  return { correct, incorrect, unanswered }
}

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)
  return (
    <footer>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Correctas: {correct} | Incorrectas: {incorrect} | Sin responder:{" "}
        {unanswered}
      </Typography>
      <Button onClick={() => reset()}>Reset</Button>
    </footer>
  )
}
export default Footer
