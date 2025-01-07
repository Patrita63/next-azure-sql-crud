import { getConnection } from "../../lib/dbsqlazure";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ Prevents stale Next.js caching

export default async function UsersPage() {
    let users = [];

    try {
        const pool = await getConnection();
        const query = 'SELECT * FROM T_Register ORDER BY Id DESC OPTION (RECOMPILE)';  // -- ✅ Prevents cached queries
        console.log('UsersPage - query: ' + query);
        const result = await pool.request().query(query);
        users = result.recordset;
        // console.log(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }

    return (
        <div>
            <h1>User Management</h1>
            <Link href="/users/create"><button>Create User</button></Link>
            <ul>
                {users.map((user) => (
                    <li key={user.Id}>
                        {user.Nome} - {user.Cognome} - {user.Email} - {user.DataDiNascita} - {user.Phone} - {user.IdTipoUtente} - {user.DataRegistrazione}
                        {/* <Link href={`/users/update?id=${user.Id}`}><button>Edit</button></Link> */}
                        <Link href={`/users/update/${user.Id}`}><button>Edit</button></Link> {/* ✅ FIXED */}
                        <Link href={`/users/delete/${user.Id}`}><button style={{ color: "red" }}>Delete</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
