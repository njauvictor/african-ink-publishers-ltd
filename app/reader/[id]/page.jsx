import { supabase } from '@/supabase';
import EpubReader from '@/components/client/EpubReader';

// Fetch book data from the database
async function getBookData(id) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }

  return data;
}

export default async function ReaderPage({ params }) {
  const { id } = params;

  // Log the book ID to check if it's being passed correctly
  console.log('Book ID:', id);

  // Check if id is defined and valid
  if (!id) {
    return (
      <div className="text-center p-8">
        <p>Invalid book ID. Please try again later.</p>
      </div>
    );
  }

  const book = await getBookData(id);

  if (!book) {
    return (
      <div className="text-center p-2 md:p-8">
        <p>Book not found. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <EpubReader book={book} />
    </div>
  );
}
