import { auth } from "@/auth";
import AppSidebar from "@/components/navbar/app-sidebar";

const Home = async () => {
    const session = await auth();
    const user = session?.user;


    return (
        <main>
            <AppSidebar />
        </main>
    );
}

export default Home;
