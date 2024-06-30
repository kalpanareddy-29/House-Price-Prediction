import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    bedrooms: '',
    bathrooms: '',
    sqftLiving: '',
    // Add other fields as per your model's input requirements
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Prediction:', data);
      // Update UI to display prediction result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>House Price Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bedrooms:
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
        </label>
        <br />
        <label>
          Bathrooms:
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
        </label>
        <br />
        <label>
          Sqft Living:
          <input type="number" name="sqftLiving" value={formData.sqftLiving} onChange={handleChange} />
        </label>
        <br />
        {/* Add more input fields for other features */}
        <br />
        <button type="submit">Predict</button>
      </form>
    </div>
  );
};

export default App;
