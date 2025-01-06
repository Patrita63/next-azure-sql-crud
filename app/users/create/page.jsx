import { getConnection } from "../../../lib/dbsqlazure";
import { redirect } from "next/navigation";

export default function CreateUser() {
    async function handleCreateUser(formData) {
        "use server";
        const name = formData.get("name");
        const email = formData.get("email");

        try {
            const pool = await getConnection();
            await pool.request()
                .input("name", name)
                .input("email", email)
                .query("INSERT INTO T_Register (Nome, Email) VALUES (@name, @email)");

            redirect("/users");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <form action={handleCreateUser}>
            <h1>Create User</h1>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Create</button>
        </form>
    );
}
