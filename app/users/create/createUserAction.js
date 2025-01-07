"use server";
import { getConnection } from "../../../lib/dbsqlazure";

export default async function createUserOnServer(Nome, Email) {
    try {
        const pool = await getConnection();
        await pool.request()
            .input("name", Nome)
            .input("email", Email)
            .query("INSERT INTO T_Register (Nome, Email) VALUES (@name, @email)");

        console.log("User created successfully on the server");
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}
