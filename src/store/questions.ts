import { create } from "zustand"
import { type Question } from "../types"
import data from "../../public/data.json"
import confetti from "canvas-confetti"
import { persist } from "zustand/middleware"

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: (limit: number) => {
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
          if (isCorrectUserAnswer) {
            confetti()
          }

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrect: isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          }
          set({ questions: newQuestions })
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get()
          const nextQuestion = currentQuestion + 1
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
          }
        },
        reset: () => {
          set({ questions: [], currentQuestion: 0 })
        },
      }
    },
    {
      name: "questions-storage",
      getStorage: () => sessionStorage,
    }
  )
)
