import { useState } from "react";

type Props = {
    score: number;
    total: number;
    answers: {
        question: string;
        selected: string;
        correct: string;
    }[];
    restartQuiz: () => void;
};

export default function Result({ score, total, answers, restartQuiz }: Props) {

    const [showReview, setShowReview] = useState(false);
    let message = "";

    if (score === total) {
        message = "🎉 Perfect Score! You're a React expert!";
    } else if (score >= total * 0.7) {
        message = "👏 Great job! You know React well.";
    } else if (score >= total * 0.4) {
        message = "👍 Not bad! Keep practicing.";
    } else {
        message = "📚 Keep learning! You'll get better.";
    }

    return (
        <div className="card">

            {!showReview ? (

                <>
                    <h2>Quiz Completed 🎉</h2>

                    <p className="final-q">
                        Your Score: {score} / {total}
                    </p>

                    <p className="score-message">
                        {message}
                    </p>

                    <button
                        className="review-btn"
                        onClick={() => setShowReview(true)}
                    >
                        Review Answers
                    </button>

                    <button
                        className="restart-btn"
                        onClick={restartQuiz}
                    >
                        Restart Quiz
                    </button>
                </>

            ) : (

                <>
                    <h2>Review Answers</h2>

                    <div className="review-container">
                        {answers.map((item, i) => (
                            <div key={i} className="review-item">

                                <p className="review-question">
                                    {i + 1}. {item.question}
                                </p>

                                <p className={item.selected === item.correct ? "correct" : "wrong"}>
                                    Your Answer: {item.selected}
                                </p>

                                {item.selected !== item.correct && (
                                    <p className="correct">
                                        Correct Answer: {item.correct}
                                    </p>
                                )}

                            </div>
                        ))}
                    </div>

                    <button
                        className="review-btn"
                        onClick={() => setShowReview(false)}
                    >
                        Back to Result
                    </button>
                </>

            )}

        </div>
    );
}