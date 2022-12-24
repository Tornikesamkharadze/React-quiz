import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";
const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=20&category=21&difficulty=easy&type=multiple";
const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  console.log(questions);
  const getData = async (url) => {
    setLoading(true);
    setWaiting(false);

    const { data } = await axios.get(url).catch((error) => console.log(error));
    if (data) {
      if (data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
        setWaiting(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    }
  };
  const nextQuestion = () => {
    setIndex((prevState) => {
      let index = prevState + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAsnwer = (value) => {
    if (value) {
      setCorrect(correct + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setWaiting(true);
    setError(false)
   
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&type=multiple&difficulty=${difficulty}`;
    getData(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        isModalOpen,
        error,
        nextQuestion,
        checkAsnwer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
