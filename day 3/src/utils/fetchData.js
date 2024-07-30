// Utility function to add delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch data with retries
export const fetchDataWithRetry = async (url, options, retries = 3, delayDuration = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (error.message.includes('429')) {
        // Too Many Requests error
        if (i < retries - 1) {
          await delay(delayDuration);
          delayDuration *= 2; // Exponential backoff
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
};

// Options for ExerciseDB API
export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY, // Make sure this is set in your environment variables
  },
};

// Options for YouTube API
export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '7ee3cd217bmshea3cb61717f6e22p102590jsnd693f3c33de8', // Ensure this is secure and properly managed
  },
};

// Function to fetch data
export const fetchData = async (url, options) => {
  try {
    const data = await fetchDataWithRetry(url, options);
    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error: Please check your internet connection.');
    } else {
      console.error('Error fetching data:', error);
    }
    return {}; // Return an empty object or handle accordingly
  }
};

// Example usage to fetch exercise data with pagination
export const fetchExercisesData = async (limit = 10, offset = 0) => {
  const url = `https://exercisedb.p.rapidapi.com/exercises?limit=${limit}&offset=${offset}`;
  try {
    const data = await fetchData(url, exerciseOptions);
    if (!Array.isArray(data)) {
      throw new Error('Fetched data is not an array');
    }
    console.log('Fetched exercises data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching exercises data:', error);
    return [];
  }
};

// Example usage to fetch body parts data
export const fetchBodyPartsData = async () => {
  const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
  try {
    const data = await fetchData(url, exerciseOptions);
    if (!Array.isArray(data)) {
      throw new Error('Fetched data is not an array');
    }
    console.log('Fetched body parts data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching body parts data:', error);
    return [];
  }
};
