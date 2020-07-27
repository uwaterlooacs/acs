import React from 'react';
import Step from './Step';
import BenefitsSrc from './Benefits.png';

export default {
  component: Step,
  title: 'HowToJoinStep',
};

export const Base = () => (
  <Step
    stepNumber={3}
    text="Enjoy All Of The Benefits"
    icon={BenefitsSrc}
    iconAlt="Benefits"
  />
);
