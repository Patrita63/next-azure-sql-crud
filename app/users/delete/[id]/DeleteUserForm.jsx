"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteUserOnServer from "./deleteUserAction"; // ✅ Import Server Action

export default function DeleteUserForm({ userId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleDeleteUser(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await deleteUserOnServer(userId); // ✅ Calls Server Action directly
            console.log("User deleted successfully");
            router.push("/users"); // ✅ Redirect after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleDeleteUser}>
            <h1>Are you sure you want to delete user {userId}?</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button type="button" onClick={() => router.push("/users")}>Cancel</button>
        </form>
    );

    // return (
    //     <form action={handleDeleteUser}>
    //         <h1>Delete User</h1>
    //         <p>Are you sure you want to delete this user?</p>
    //         <button type="submit">Yes, Delete</button>
    //         <a href="/users">Cancel</a>
    //     </form>
    // );
}
