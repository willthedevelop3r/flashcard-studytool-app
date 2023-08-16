import React from 'react';
// Component for card from
function CardForm({
  header,
  handleSubmit,
  handleChange,
  handleCancel,
  formData,
  cancelLabel,
  submitLabel,
}) {
  // Card form structure
  return (
    <>
      <h2>{header}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='front'>Front</label>
          <textarea
            className='form-control'
            id='front'
            value={formData.front}
            name='front'
            onChange={handleChange}
            placeholder='Front side of card'
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='back'>Back</label>
          <textarea
            className='form-control'
            id='back'
            value={formData.back}
            name='back'
            onChange={handleChange}
            placeholder='Back side of card'
            required
          ></textarea>
        </div>
        <button className='btn btn-secondary mr-2' onClick={handleCancel}>
          {cancelLabel}
        </button>
        <button type='submit' className='btn btn-primary mr-2'>
          {submitLabel}
        </button>
      </form>
    </>
  );
}

export default CardForm;
