import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
} from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { Question } from "./types"
import Footer from "./Footer"

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number, info: Question) => {
    const { userSelectedAnswer, correctAnswer } = info
    if (userSelectedAnswer == null) return "transparent"
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return "transparent"

    if (index === correctAnswer) return "green"
    if (index === userSelectedAnswer) return "red"
    return "transparent"
  }
  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2 }}>
      <Typography variant="h5">{info.question}</Typography>
      <List disablePadding sx={{ bgcolor: "#333", mt: "10px" }}>
        {info.answers.map((el, index) => (
          <ListItem key={index} disablePadding divider>
            {
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{
                  backgroundColor: getBackgroundColor(index, info),
                }}
              >
                <ListItemText primary={el} />
              </ListItemButton>
            }
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Typography variant="h3">Pregunta {currentQuestion + 1}</Typography>
      {currentQuestion < questions.length - 1 && (
        <Button variant="text" sx={{ margin: 1 }} onClick={goNextQuestion}>
          Siguiente
        </Button>
      )}
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
