// app/audio/[id]/page.js
import AudioPlayer from '@/components/client/AudioPlayer'; // Adjust the path as necessary

export default async function AudioPage({ params }) {
  const { id } = params; // Get the audio ID from params
  
  let book = null;
  let isLoading = true;
  let error = null;

  try {
    // Adjust the endpoint to match your backend schema
    const res = await fetch(`https://book-store-server-bice.vercel.app/book/${id}`); 
    if (!res.ok) {
      throw new Error(`Failed to fetch book data: ${res.status}`);
    }
    book = await res.json(); // Parse the JSON response
    isLoading = false;
  } catch (err) {
    error = err.message;
    isLoading = false;
  }

  return (
    <div>
      <AudioPlayer book={book} isLoading={isLoading} error={error} />
    </div>
  );
}
