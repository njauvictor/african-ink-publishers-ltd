import SingleBookContent from '@/components/client/SingleBookContent'; 

export default async function BookPage({ params }) {
  
    // Ensure params is awaited properly
    const { id } = await params;  // Await params
  
    let book = null;
    let isLoading = true;
    let error = null;
  
    try {
      const res = await fetch(`https://book-store-server-bice.vercel.app/book/${id}`); // Fetch data using the book ID
      if (!res.ok) {
        throw new Error(`Failed to fetch book data: ${res.status}`);
      }
      book = await res.json(); // Parse the JSON response
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  
    const category = book?.category;
  
    return (
      <div>
        <SingleBookContent book={book} isLoading={isLoading} error={error} />
        {/* Render category-Based Recommendations
        {!isLoading && book && category && (
          <RecommendationSection category={category} limit={4} />
        )} */}
      </div>
    );
  }
  