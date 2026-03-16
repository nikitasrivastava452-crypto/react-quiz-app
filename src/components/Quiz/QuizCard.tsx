type Props = {
    question: string;
    options: string[];
    onAnswer: (index: number) => void;
    current: number;
    total: number;
    correctIndex: number;
    selected: number | null;
};

export default function QuizCard({
    question,
    options,
    onAnswer,
    current,
    total,
    correctIndex,
    selected
}: Props) {

    const progress = ((current + 1) / total) * 100;

    return (
        <div className="card">

            <div className="progress-wrapper">
                <p className="progress-text">
                    Question {current + 1} of {total}
                </p>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <h2>{question}</h2>

            <div className="options">
                {options.map((opt, i) => {
                    let className = "";

                    if (selected !== null) {
                        if (i === correctIndex) className = "correct";
                        else if (i === selected) className = "wrong";
                    }

                    return (
                        <button
                            key={i}
                            className={className}
                            onClick={() => onAnswer(i)}
                            disabled={selected !== null}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>

        </div>
    );
}