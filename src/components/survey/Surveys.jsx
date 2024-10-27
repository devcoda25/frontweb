import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getQuestionApi } from 'src/hooks/getQuestion';
import { setQuestionResultApi } from 'src/store/actions/campaign';
import { getLanguage, getUser } from 'src/utils/api';
import Card from '../skeletons/Card';
import { ProgressBar } from 'react-bootstrap';

const Surveys = () => {
    const [submited, setSubmited] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [submittedQuestionId, setSubmittedQuestionId] = useState(null);
    const [visibleQuestionsCount, setVisibleQuestionsCount] = useState(2); // Initial count of visible questions

    let { id: language_id } = getLanguage();
    let user = getUser();

    // api call
    const getQuestion = async () => {
        try {
            const { data } = await getQuestionApi.getQuestion({
                language_id: language_id,
                user_id: user,
            });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    // react query
    const { data: questionsData } = useQuery({
        queryKey: ['getQuestion'],
        queryFn: getQuestion,
    });

    const handleOptionClick = (options) => {
        setSelectedOption(options.id);
        setQuestionResultApi({
            language_id: language_id,
            question_id: options?.question_id,
            option_id: options?.id,
            onSuccess: async (response) => { },
            onError: (error) => {
                console.log(error);
                toast.error(error);
            },
        });
    };

    const getQuestionResultApi = async (id) => {
        try {
            const { data } = await getQuestionApi.getQuestionResult({
                language_id: language_id,
                question_id: id,
            });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data: answers, isLoading } = useQuery({
        queryKey: ['getQuestionResult', submittedQuestionId],
        queryFn: submittedQuestionId ? () => getQuestionResultApi(submittedQuestionId) : () => [],
        enabled: !!submittedQuestionId,
    });

    const handleSubmit = (id) => {
        setSubmittedQuestionId(id);
        setSubmited(true);
    };

    const handleLoadMore = () => {
        setVisibleQuestionsCount((prevCount) => prevCount + 2);
    };

    return (
        <section className='surveysSect'>
            {questionsData &&
                questionsData
                    .filter((_, index) => index < visibleQuestionsCount)
                    .map((survey) => {
                        if (submittedQuestionId === null || submittedQuestionId !== survey.id) {
                            // Render the question if it hasn't been submitted or if it's not the submitted question
                            return (
                                <div className='' key={survey.id}>
                                    <div className="card">
                                        <span className='question'>{survey?.question}</span>
                                        {survey?.survey_options.map((options) => {
                                            return (
                                                <span
                                                    key={options.id}
                                                    className={`options ${options.id === selectedOption ? 'selectedOption' : ''
                                                        }`}
                                                    onClick={() => handleOptionClick(options)}
                                                >
                                                    {options?.options}
                                                </span>
                                            );
                                        })}
                                        <button className='submitBtn' onClick={() => handleSubmit(survey.id)}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        // Otherwise, render the answers for the submitted question
                        return (
                            <div className='' key={survey.id}>
                                <div className="card resultCard">
                                    <span className='question'>{survey?.question}</span>
                                    {isLoading ? (
                                        <Card />
                                    ) : (
                                        answers &&
                                        answers[0]?.survey_options?.map((options) => (
                                            <div key={options.id}>
                                                <span>
                                                    <ProgressBar now={options.percentage} />
                                                </span>
                                                <span className='percentage'>
                                                    {Math.ceil(options.percentage)}%
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
            {questionsData && visibleQuestionsCount < questionsData.length && (
                <button onClick={handleLoadMore} className='loadMoreBtn commonBtn'>Load More</button>
            )}
        </section>
    );
};

export default Surveys;

