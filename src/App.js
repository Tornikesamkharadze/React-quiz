import { useGlobalContext } from "./Global/context";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";
import SetupForm from "./Components/SetupForm";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAsnwer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { category, difficulty, incorrect_answers, question, correct_answer } =
    questions[index];

  let answers = [...incorrect_answers];
  const temotIndex = Math.floor(Math.random() * 4);
  if (temotIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[temotIndex]);
    answers[temotIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="btn-container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => checkAsnwer(correct_answer === answer)}
                  className="answer-btn"
                  key={index}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <button onClick={nextQuestion} className="next-question">
            next question
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
