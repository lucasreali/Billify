import { auth } from "@/auth";

const Home = async () => {
    const session = await auth();
    const user = session?.user;


    return (
        <main>
            <div>{user?.name}</div>
        </main>
    );
}

export default Home;
