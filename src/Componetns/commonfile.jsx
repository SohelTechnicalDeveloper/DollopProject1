 
        //  table header 
 
 {/* <h2 style={{ color: "#07284B", marginLeft: "25px" }}>Users</h2>

        <div
          className="form-group d-flex justify-content-end mx-5 mt-4"
          style={{ fontFamily: "Gill Sans, sans-serif" }}
        >
          <div className="mx-4">
            <input
              type="text"
              className="form-control input-color"
              placeholder="Search"
              onChange={(e) => searchUser(e)}
            />
          </div>
          <button
            onClick={() => addShowModel()}
            className="btn text-truncate"
            style={{
              backgroundColor: "#21b7b5",
              color: "#fff",
              fontSize: "18px",
            }}
          >
            {" "}
           
          </button>
        </div> */}


      //  button for the total question no

      
        // {Array.from({ length: totalQuestions }).map((_, index) => (
        //   <button
        //     key={index}
        //     className={`btn m-1  ${
        //       questionStatus[index] === 'answered'
        //         ? 'btn-success'
        //         : questionStatus[index] === 'notAnswered'
        //         ? 'btn-warning'
        //         : 'btn-secondary'
        //     }`}
        //     onClick={() => handleQuestionClick(index)}
        //   >
        //     {index + 1}
        //   </button>
        // ))}
         {/* <div className="fw-bold">
                    {subjectsData?.subjectQuestions?.[subject]?.questions?.[
                      currentIndex
                    ]?.question
                      ? parse(
                          String(
                            subjectsData.subjectQuestions[subject].questions[
                              currentIndex
                            ]?.question
                          ),
                          options
                        )
                      : "No question available"}
                  </div> */}




                   // const handleSubQuestion = (questionId, subQuestionId, index) => {
  //   console.log(questionId, subQuestionId, index);

  //   setSubSelectedOptions((prevSubOptions) => {
  //     const existingPrevSelection = prevSubOptions.findIndex(
  //       (subOption) =>
  //         subOption.questionId === questionId &&
  //         subOption.subQuestionId === subQuestionId
  //     );
  //     console.log(existingPrevSelection !== -1);

  //     if (existingPrevSelection !== -1) {
  //       if (prevSubOptions[existingPrevSelection]?.index === index) {
  //         return prevSubOptions.filter(
  //           (subOption, index) => index !== existingPrevSelection
  //         );
  //       } else {
  //         return prevSubOptions.map((subOption, i) =>
  //           i === existingPrevSelection ? { ...subOption, index } : subOption
  //         );
  //       }
  //     } else {
  //       setSubSelectedOptions([
  //         ...prevSubOptions,
  //         { questionId, subQuestionId, index },
  //       ]);
  //     }
  //   });
  // };
  
  // const handleQuestion = (questionId, index) => {
  //   setSelectedOptions((prevOptions) => {
  //     const existingSelection = prevOptions.findIndex(
  //       (option) => option.questionId === questionId
  //     );
  
  //     if (existingSelection !== -1) {
  //       // Toggle selection if the same option is clicked again
  //       if (prevOptions[existingSelection]?.index === index) {
  //         return prevOptions.filter(
  //           (option, idx) => idx !== existingSelection
  //         );
  //       } else {
  //         return prevOptions.map((option, i) =>
  //           i === existingSelection ? { ...option, index } : option
  //         );
  //       }
  //     } else {
  //       // Add new selected option
  //       return [...prevOptions, { questionId, index }];
  //     }
  //   });
  
  //   // Update question status to "answered"
  //   setQuestionStatus((prevStatus) =>
  //     prevStatus.map((status, idx) =>
  //       idx === currentQuestion ? "answered" : status
  //     )
  //   );
  // };



   // Function to simulate a countdown timer
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(prevTime => {
  //       const { hours, minutes, seconds } = prevTime;
  //       if (seconds > 0) {
  //         return { ...prevTime, seconds: seconds - 1 };
  //       } else if (minutes > 0) {
  //         return { hours, minutes: minutes - 1, seconds: 59 };
  //       } else if (hours > 0) {
  //         return { hours: hours - 1, minutes: 59, seconds: 59 };
  //       }
  //       return prevTime;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  