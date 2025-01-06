import { getConnection } from "../../../../lib/dbsqlazure";
import { redirect } from "next/navigation";

export default async function DeleteUser({ searchParams }) {
    const userId = searchParams.id;

    async function handleDeleteUser() {
        "use server";

        try {
            const pool = await getConnection();
            await pool.request().input("id", userId).query("DELETE FROM T_Register WHERE Id = @id");

            redirect("/users");
        } catch (error) {
            console.error("Error deleting user:", error);
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
