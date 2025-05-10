import { auth } from '@/auth';
import {
    BellIcon,
    ClipboardListIcon,
    CogIcon,
    CreditCardIcon,
    FileTextIcon,
    LayoutDashboardIcon,
    LineChartIcon,
    PlusIcon,
    SendIcon,
    UsersIcon,
    WalletIcon,
} from 'lucide-react';
import Image from '../next/image';
import Link from '../next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar';
import NavUser from './nav-user';
import MainSidebar from './main-sidebar';

const AppSidebar = async () => {
    const session = await auth();
    const userAtr = session?.user;

    const user = {
        name: userAtr?.name || '',
        email: userAtr?.email || '',
        avatar: userAtr?.image || '',
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className='data-[slot=sidebar-menu-button]:!p-1.5'
                        >
                            <Link href='#'>
                                <div className='flex items-center space-x-2 text-xl'>
                                    <Image
                                        src='/logo.svg'
                                        width={1}
                                        height={1}
                                        alt='billify'
                                        className='h-[20px] w-full'
                                    />

                                    <span className='text-2xltext-base font-semibold'>
                                        Billify
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <MainSidebar />

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
