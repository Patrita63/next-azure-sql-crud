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
        <form action={handleDeleteUser}>
            <h1>Delete User</h1>
            <p>Are you sure you want to delete this user?</p>
            <button type="submit">Yes, Delete</button>
            <a href="/users">Cancel</a>
        </form>
    );
}
