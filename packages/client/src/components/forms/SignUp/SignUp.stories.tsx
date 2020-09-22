import React from 'react';
import { action } from '@storybook/addon-actions';
import SignUpForm from '.';

export default {
  component: SignUpForm,
  title: 'SignUpForm',
};

const baseProps = {
  firstName: '',
  setFirstName: action('setFirstName'),
  lastName: '',
  setLastName: action('setLastName'),
  studentNumber: '',
  setStudentNumber: action('setStudentNumber'),
  email: '',
  setEmail: action('setEmail'),
  semester: '',
  setSemester: action('setSemester'),
  faculty: '',
  setFaculty: action('setFaculty'),
  onNext: action('onNext'),
};

export const Base = () => <SignUpForm {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '400px' }}>
    <SignUpForm {...baseProps} />
  </div>
);
