
import { getConnection } from "../../../../lib/dbsqlazure";
import DeleteUserForm from "./DeleteUserForm";

export default async function DeleteUser({ params }) {
    const userId = params?.id;

    if (!userId) return <h1>Error: Missing User ID</h1>;

    let user = null;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", userId)
            .query("SELECT FROM T_Register WHERE Id = @id");
        user = result.recordset[0];
    } catch (error) {
        console.error("Error deleting user:", error);
    }

    return <DeleteUserForm user={user} userId={userId} />;
}
