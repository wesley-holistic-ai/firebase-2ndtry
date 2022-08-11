import { useState } from "react";

const Question = (props) => {
  const questionType = props.question.questionType;
  if (questionType === "freeText") {
    return (
      <div className="rounded border-2 my-4">
        <p className="my-2">{props.question.questionText}</p>

        <span className="bg-slate-500 text-white rounded p-2 my-2 ">
          {props.question.questionRequired ? "Requried" : "Optional"}
        </span>
        <br />
        <textarea className="my-2 rounded w-3/5" />
      </div>
    );
  } else if (questionType === "yesNo") {
    return (
      <div className="rounded border-2 my-4">
        <p>{props.question.questionText}</p>
        <br />
        <p className="bg-slate-500 text-white rounded p-2">
          {props.question.questionRequired ? "Requried" : "Optional"}
        </p>
        <input className="m-2" type="radio" name="YesNo" value="Yes" />
        <label>Yes</label>
        <input className="m-2" type="radio" name="YesNo" value="No" />
        <label>No</label>
      </div>
    );
  } else if (questionType === "scq") {
    return (
      <div className="rounded border-2 my-4">
        <p>{props.question.questionText}</p>
        <br />
        <span className="bg-slate-500 text-white rounded p-2">
          {props.question.questionRequired ? "Requried" : "Optional"}
        </span>

        {props.question.questionChoiceList.map((choiceObject) => {
          return (
            <>
              <input
                className="m-2"
                key={choiceObject.choiceId}
                type="radio"
                name="scq"
                value={choiceObject.choice}
              />
              <label>{choiceObject.choice}</label>
            </>
          );
        })}
      </div>
    );
  } else if (questionType === "mcq") {
    return (
      <div className="rounded border-2 my-2">
        <p>{props.question.questionText}</p>
        <br />
        <span className="bg-slate-500 text-white rounded p-2 w-3/5">
          {props.question.questionRequired ? "Requried" : "Optional"}
        </span>

        {props.question.questionChoiceList.map((choiceObject) => {
          return (
            <>
              <input
                key={choiceObject.choiceId}
                type="checkbox"
                name="mcq"
                value={choiceObject.choice}
                className="m-2"
              />
              <label>{choiceObject.choice}</label>
            </>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Question;
