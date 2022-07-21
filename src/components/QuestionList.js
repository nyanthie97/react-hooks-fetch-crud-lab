import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  //fetch when the component loads
  //where are using the data => questionlist
  //useEffect 
  const [questions, setQuestions] =useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(data=>setQuestions(data))
  },[])
  console.log(questions)
  function handleUpdateOnDelete(deleteQuiz){
      //delete question from the server
    //delete the question in the list
    const serverOptions = {method:"DELETE"}
    fetch(`http://localhost:4000/questions/${deleteQuiz.id}`, serverOptions)
    .then(r=>r.json())
    .then(()=> setQuestions(questions=>questions.filter(quiz=>quiz.id!==deleteQuiz.id)))

  }
  function handleOnAnswerChange(updatedQuiz,e) {
    const serverOptions ={
      method: "PATCH",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({...updatedQuiz, correctIndex:e.target.value})
    }
    fetch(`http://localhost:4000/questions/${updatedQuiz.id}`, serverOptions)
    .then(r=>r.json())
    .then(updatedQuiz=>console.log(updatedQuiz))
  }
  const lis = questions.map(quiz=> {
    return <QuestionItem onAnswerChange={handleOnAnswerChange} onDelete={handleUpdateOnDelete} question={quiz} key={quiz.id}/>
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{lis}</ul>
    </section>
  );
}

export default QuestionList;
