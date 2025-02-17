// This function is responsible for fetching book recommendations based on category
export default async function getCategoryRecommendations(category, limit = 4) {
    try {
      const response = await fetch(`https://book-store-server-bice.vercel.app/all-books`);
      
      // Check if the response was successful (status code 200)
      if (!response.ok) {
        throw new Error('Failed to fetch category recommendations');
      }
  
      // Parse the response as JSON
      const data = await response.json();
      
      console.log('API Response:', data);  // Log the response to understand its structure
  
      // Ensure the books array exists and is an array before filtering
      const books = Array.isArray(data.books) ? data.books : [];
      
      // Filter the books based on the provided category (making sure both category and the API's category are case-insensitive)
      const filteredBooks = books.filter(book => book.category?.toLowerCase() === category.toLowerCase());
      
      // Return the filtered books, limiting to the specified limit
      return filteredBooks.slice(0, limit);
    } catch (error) {
      console.error('Error fetching category recommendations:', error);
      return []; // Return an empty array in case of an error
    }
  }
  
  