// lib/fetchBooks.js
export const fetchBook = async (id) => {
    const response = await fetch(`https://book-store-server-bice.vercel.app/book/${id}`);
    if (!response.ok) throw new Error('Failed to fetch book');
    return response.json();
  };
  