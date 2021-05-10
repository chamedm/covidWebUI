import React from 'react';


function SingleQuestion({index, questionObj}) {

  return (
    <div className="questions__content--text">
          <p className="questions__question">
            {`Q${index}: `}{questionObj.question}
            {/* Q1: Why is the disease being called coronavirus disease 2019, COVID-19?  */}
          </p>
          <p className="questions__answer">
          {`A${index}: `}{questionObj.answer}

            {/* A1: On February 11, 2020 the World Health Organization announced an ocial name for the disease that is causing the 2019 novel coronavirus outbreak, rst identied in Wuhan China. The new name of this disease is coronavirus disease 2019, abbreviated as COVID-19. In COVID-19, “CO” stands for corona, “VI” for virus, and ”D” for disease. Formerly, this disease was referred to as “2019 novel coronavirus” or “2019-nCoV. */}
          </p>
    </div>
  )
}

export default SingleQuestion;