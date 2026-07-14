import Step from "./Step";
import "./Stepper.css";

const Stepper = ({
    steps = [],
    completed = []
}) => {

    const currentIndex = completed.length;

    return (

        <div className="stepper">

            {

                steps.map((step, index) => {

                    let state = "pending";

                    if (completed.includes(step.value)) {

                        state = "completed";

                    }

                    else if (index === currentIndex) {

                        state = "current";

                    }

                    return (

                        <Step
                            key={step.value}
                            step={step}
                            state={state}
                            isLast={
                                index ===
                                steps.length - 1
                            }
                        />

                    );

                })

            }

        </div>

    );

};

export default Stepper;