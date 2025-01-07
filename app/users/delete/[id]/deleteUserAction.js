"use server";
import { getConnection } from "../../../../lib/dbsqlazure";

export default async function deleteUserOnServer(userId) {
    try {
        const pool = await getConnection();
        await pool.request()
            .input("id", userId)
            .query("DELETE FROM T_Register WHERE Id = @id OPTION (RECOMPILE)"); // -- ✅ Prevents cached execution

        console.log("User deleted successfully on the server");
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
}
