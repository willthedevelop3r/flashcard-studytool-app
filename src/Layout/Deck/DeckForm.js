import React from 'react';

// Deck form component
function DeckForm({
  header,
  handleSubmit,
  handleChange,
  handleCancel,
  formData,
  buttonOne,
  buttonTwo,
}) {
  // Deck form structure
  return (
    <>
      <h2>{header}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            className='form-control'
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Deck Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Brief Description of the Deck'
            required
          ></textarea>
        </div>
        <div>
          <button
            className='btn btn-secondary mr-2'
            type='button'
            onClick={handleCancel}
          >
            {buttonOne}
          </button>
          <button className='btn btn-primary' type='submit'>
            {buttonTwo}
          </button>
        </div>
      </form>
    </>
  );
}

export default DeckForm;
