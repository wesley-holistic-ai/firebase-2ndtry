import { useReducer, useContext } from "react";
import Question from "./question";
import ModulesContext from "./modulesContext";

const ModuleConfig = (props) => {
  const defaultSettings = {
    questionField: "", //the filed user uses to enter question
    questionType: "",
    choiceEnabled: false,
    choiceField: "",
    choiceList: [],
    questionRequired: true,
    questions: [
      // {
      //   questionId: Date.now(),
      //   questionText: "What is the meaning of life?",
      //   questionType: "freeText",
      //   questionRequired: true,
      //   questionChoiceList: [],
      // },
    ], //saved quetions
  };

  const [module, dispatch] = useReducer(reducer, defaultSettings);
  const {savedModules, setSavedModules} = useContext(ModulesContext);

  function reducer(module, action) {
    switch (action.type) {
      case "EDIT_NEW_QUESTION":
        return { ...module, questionField: action.payload.questionField };
      case "ADD_QUESTION":
        return {
          ...module,
          questions: [
            ...module.questions,
            {
              questionId: Date.now(),
              questionText: module.questionField,
              questionType: module.questionType,
              questionRequired: module.questionRequired,
              questionChoiceList: module.choiceList,
            },
          ],
        };
      case "TOGGLE_REQUIRED":
        return { ...module, questionRequired: !module.questionRequired };
      case "CHANGE_QUESTION_TYPE":
        return { ...module, questionType: action.payload.questionType };
      case "CHANGE_CHOICEENABLED":
        return { ...module, choiceEnabled: action.payload.choiceEnabled };
      case "CHANGE_CHOICE_FIELD":
        return { ...module, choiceField: action.payload.choiceField };

      case "ADD_CHOICE":
        return {
          ...module,
          choiceList: [
            ...module.choiceList,
            { choiceId: Date.now(), choice: module.choiceField },
          ],
        };
      case "CLEAR_ALL_FIELDS":
        return {
          ...module,
          ...{
            questionField: "",
            choiceField: "",
            questionType: "",
            choiceList: [],
          },
        };
      case "COMPLETE_MODULE":
        return { ...module, complete: !module.complete };
    }
  }

  function handleAddQuestion() {

    setSavedModules(
      savedModules.map((savedModule) => {
        if (savedModule.key === props.module.key) {
          return {
            ...savedModule,
            questions:[...savedModule.questions, {
              questionId: Date.now(),
              questionText: module.questionField,
              questionType: module.questionType,
              questionRequired: module.questionRequired,
              questionChoiceList: module.choiceList,
            }],
          };
        }
        return savedModule;
      })
    );
    dispatch({ type: "CLEAR_ALL_FIELDS" });
  }

  function handleQuestionType(e) {
    dispatch({
      type: "CHANGE_QUESTION_TYPE",
      payload: { questionType: e.target.value },
    });
    if (module.questionType === "scq" || module.questionType === "mcq") {
      dispatch({
        type: "CHANGE_CHOICEENABLED",
        payload: { choiceEnabled: true },
      });
    } else {
      dispatch({
        type: "CHANGE_CHOICEENABLED",
        payload: { choiceEnabled: false },
      });
    }
  }

  function handleAddChoice() {
    dispatch({ type: "ADD_CHOICE" });
    dispatch({
      type: "CHANGE_CHOICE_FIELD",
      payload: { choiceField: "" },
    });
  }

  function handleComplete() {
    setSavedModules(
      savedModules.map((savedModule) => {
        if (savedModule.key === props.module.key) {
          return {
            ...savedModule, complete: true,
          };
        }
        return savedModule;
      })
    );
  }

  function handleForm(e) {
    e.preventDefault();
  }

  console.log(savedModules);
  

  return (
    <div className="mt-5">
      <form onSubmit={handleForm}>
        <h1 className="font-bold text-m border-b-4 mb-10">
          {" "}
          Question Configuration{" "}
        </h1>

        <div>
          <p className="my-2">Question Type</p>
          <select
            className="rounded w-3/5 text-slate-500 my-2"
            value={module.questionType}
            onChange={handleQuestionType}
            onBlur={handleQuestionType}
          >
            <option>Select Question Type</option>
            <option value="freeText">Free Text</option>
            <option value="yesNo">Yes/No</option>
            <option value="scq">Single Choice Questions</option>
            <option value="mcq">Multiple Choice Questions</option>
          </select>
          <p className="my-2">Question</p>
          <textarea
            placeholder="Enter question"
            value={module.questionField}
            onChange={(e) =>
              dispatch({
                type: "EDIT_NEW_QUESTION",
                payload: { questionField: e.target.value },
              })
            }
            className="block rounded-lg border w-3/5 my-2"
          />
          {module.choiceEnabled ? (
            <div className="my-2">
              <p>Choice</p>
              <input
                className="rounded"
                type="text"
                placeholder="choice"
                value={module.choiceField}
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE_CHOICE_FIELD",
                    payload: { choiceField: e.target.value },
                  })
                }
              />
              <button
                onClick={handleAddChoice}
                className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 m-2"
              >
                {" "}
                Add Choice
              </button>
              <p>
                choice:
                {module.choiceList.map((choiceObject, i) => {
                  return (
                    (i && choiceObject.choice ? ", " : " ") +
                    choiceObject.choice
                  );
                })}
              </p>
            </div>
          ) : null}
          <p className="my-2 border-4 p-2">
            {" "}
            Required?
            <input
              className="rounded ml-2"
              type="checkbox"
              id="quali"
              value="wesley"
              onClick={() => dispatch({ type: "TOGGLE_REQUIRED" })}
              defaultChecked={module.questionRequired}
            />
          </p>

          <button
            onClick={handleAddQuestion}
            disabled={module.questionField===""}
            className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 my-2 w-3/5 disabled:bg-indigo-100 "
          >
            {" "}
            Add question{" "}
          </button>
        </div>
      </form>
      <h1 className="font-bold text-m border-b-4 my-10">
        {" "}
        Questions assigned to {props.module.name}{" "}
      </h1>
      {props.module.questions.map((question) => {
        return( 
        <div>
        <Question key={question.questionId} question={question} />
        </div>)
      })}


      <p className="font-bold text-m border-b-4 my-20">
        {" "}
        Module Status: {props.module.complete ? "Complete" : "Incomplete"}
      </p>

      <button
        onClick={handleComplete}
        className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 w-full"
      >
        Complete module
      </button>
    </div>
  );
};

export default ModuleConfig;
