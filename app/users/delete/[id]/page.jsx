
import DeleteUserForm from "./DeleteUserForm";

export default async function DeleteUser({ params }) {
    const userId = params?.id;

    if (!userId) return <h1>Error: Missing User ID</h1>;

    return <DeleteUserForm userId={userId} />;
}
