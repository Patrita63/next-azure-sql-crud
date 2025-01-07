"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createUserOnServer from "./createUserAction"; // ✅ Import Server Action

export default function CreateUserForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleCreateUser(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.target);
        const Nome = formData.get("name");
        const Email = formData.get("email");

        try {
            await createUserOnServer(Nome, Email); // ✅ Calls Server Action directly
            console.log("User created successfully");
            router.push("/users"); // ✅ Redirect after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleCreateUser}>
            <h1>Create New User</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" name="name" placeholder="Enter Name" required />
            <input type="email" name="email" placeholder="Enter Email" required />
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
            </button>
        </form>
    );
}
