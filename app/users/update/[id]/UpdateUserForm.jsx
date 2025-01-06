"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import updateUserOnServer from "./updateUserAction"; // ✅ Import Server Action

export default function UpdateUserForm({ user, userId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleUpdateUser(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.target);
        const Nome = formData.get("name");
        const Email = formData.get("email");

        try {
            await updateUserOnServer(userId, Nome, Email); // ✅ Calls Server Action directly
            console.log("User updated successfully");
            router.push("/users"); // ✅ Redirect after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleUpdateUser}>
            <h1>Update User With Id {userId}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" name="name" defaultValue={user?.Nome} required />
            <input type="email" name="email" defaultValue={user?.Email} required />
            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}
