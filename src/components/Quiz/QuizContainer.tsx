import { useState } from "react";
import QuizCard from "./QuizCard";
import Result from "./Result";
import { questions } from "../../data/questions";
import "./quiz.css";

interface Answer {
    question: string;
    selected: string;
    correct: string;
}

function shuffleArray(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function QuizContainer() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showFinal, setShowFinal] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [quizQuestions, setQuizQuestions] = useState(() => shuffleArray(questions));
    const [answers, setAnswers] = useState<Answer[]>([]);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const handleAnswer = (index: number) => {
        if (selected !== null) return;

        setSelected(index);

        const correctIndex = quizQuestions[current].correct;

        const selectedOption = quizQuestions[current].options[index];
        const correctOption = quizQuestions[current].options[correctIndex];

        setAnswers((prev) => [
            ...prev,
            {
                question: quizQuestions[current].question,
                selected: selectedOption,
                correct: correctOption,
            },
        ]);

        if (index === correctIndex) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (current === quizQuestions.length - 1) {
                setShowFinal(true);
            } else {
                setCurrent((prev) => prev + 1);
                setSelected(null);
            }
        }, 1000);
    };

    const restartQuiz = () => {
        setQuizStarted(false);
        setCurrent(0);
        setScore(0);
        setShowFinal(false);
        setSelected(null);
        setAnswers([]);
        setQuizQuestions(shuffleArray(questions));
    };

    return (
        <div className="container">

            {!quizStarted ? (

                <div className="card start-screen">
                    <h1>React Quiz</h1>

                    <p className="quiz-description">
                        Test your knowledge of React fundamentals.
                    </p>

                    <p className="quiz-info">
                        {questions.length} Questions
                    </p>

                    <button className="start-btn" onClick={startQuiz}>
                        Start Quiz
                    </button>
                </div>

            ) : !showFinal ? (

                <QuizCard
                    question={quizQuestions[current].question}
                    options={quizQuestions[current].options}
                    onAnswer={handleAnswer}
                    current={current}
                    total={questions.length}
                    correctIndex={quizQuestions[current].correct}
                    selected={selected}
                />

            ) : (

                <Result
                    score={score}
                    total={questions.length}
                    restartQuiz={restartQuiz}
                    answers={answers}
                />

            )}

        </div>
    );
}