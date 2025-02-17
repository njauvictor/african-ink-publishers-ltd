// app/user/[id]/page.js
import ViewUser from "@/components/admin/ViewUser";

export default async function ViewUserPage({ params }) {
  const { id } = params; // Access the dynamic ID from params

  let user = null;
  let isLoading = true;
  let error = null;

  try {
    const res = await fetch(`https://book-store-server-bice.vercel.app/user/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.status}`);
    }
    user = await res.json(); // Parse the JSON response
    isLoading = false;
  } catch (err) {
    error = err.message;
    isLoading = false;
  }

  // Return the ViewUser component with the fetched data
  return (
    <div>
      <ViewUser user={user} isLoading={isLoading} error={error} />
    </div>
  );
}
