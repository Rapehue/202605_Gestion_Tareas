const Step = ({
    step,
    state,
    isLast
}) => {

    return (

        <div className="step">

            <div className="step-top">

                <div className={`step-circle ${state}`}>

                    {
                        state === "completed"
                            ? "✓"
                            : step.icon
                    }

                </div>

                {!isLast && (

                    <div
                        className={`step-line ${state}`}
                    />

                )}

            </div>

            <div className="step-label">

                {step.label}

            </div>

        </div>

    );

};

export default Step;