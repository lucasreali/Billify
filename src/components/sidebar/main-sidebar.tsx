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
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar';
import Link from '../next/link';

const MainSidebar = () => {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a href='/dashboard' className='flex items-center'>
                                <LayoutDashboardIcon className='mr-2 h-4 w-4' />
                                Dashboard
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a href='/invoices' className='flex items-center'>
                                <FileTextIcon className='mr-2 h-4 w-4' />
                                Invoices
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Link href='/clients' className='flex items-center'>
                                <UsersIcon className='mr-2 h-4 w-4' />
                                Clients
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Finance</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a href='/payments' className='flex items-center'>
                                <WalletIcon className='mr-2 h-4 w-4' />
                                Payments
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a
                                href='/reports/revenue'
                                className='flex items-center'
                            >
                                <LineChartIcon className='mr-2 h-4 w-4' />
                                Revenue
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            
        </SidebarContent>
    );
};

export default MainSidebar;
