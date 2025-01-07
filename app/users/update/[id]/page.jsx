import { getConnection } from "../../../../lib/dbsqlazure";
import UpdateUserForm from "./UpdateUserForm";

export default async function UpdateUser({ params }) {
    const userId = params?.id;

    if (!userId) return <h1>Error: Missing User ID</h1>;

    let user = null;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", userId)
            .query("SELECT * FROM T_Register WHERE Id = @id OPTION (RECOMPILE)"); // -- ✅ Forces SQL Server to return fresh results
        user = result.recordset[0];
    } catch (error) {
        console.error("Error fetching user:", error);
    }

    return <UpdateUserForm user={user} userId={userId} />;
}
