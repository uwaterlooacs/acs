import React from 'react';
import MailingListForm from '.';

export default {
  component: MailingListForm,
  title: 'MailingListForm',
};

export const Form = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8f8ff',
    }}
  >
    <MailingListForm />
  </div>
);
