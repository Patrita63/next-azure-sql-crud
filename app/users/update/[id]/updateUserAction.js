"use server";
import { getConnection } from "../../../../lib/dbsqlazure";

export default async function updateUserOnServer(userId, Nome, Email) {
    try {
        const pool = await getConnection();
        await pool.request()
            .input("id", userId)
            .input("name", Nome)
            .input("email", Email)
            .query("UPDATE T_Register SET Nome = @name, Email = @email WHERE Id = @id");

        console.log("User updated successfully on the server");
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}
