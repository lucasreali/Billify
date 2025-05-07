import { auth } from '@/auth';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '../ui/sidebar';
import NavUser from './nav-user';

const AppSidebar = async () => {
    const session = await auth();
    const userAtr = session?.user;

    const user = {
        name : userAtr?.name || '',
         email : userAtr?.email || '',
         avatar : userAtr?.image || '',
    }


    return (
        <Sidebar>
            <SidebarHeader>ola</SidebarHeader>

            <SidebarContent>1</SidebarContent>

            <SidebarFooter>
                <NavUser
                    user={user}
                />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
