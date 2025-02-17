// app/book/[id]/page.js
import ViewBook from "@/components/admin/ViewBook";

export default async function ViewBookPage({ params }) {
    const { id } = params; // Access the dynamic ID from params

    let book = null;
    let isLoading = true;
    let error = null;

    try {
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

    // Return the ViewBook component with the fetched data
    return (
        <div>
            <ViewBook book={book} isLoading={isLoading} error={error} />
        </div>
    );
}
