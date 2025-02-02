import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return(
        <div className='min-h-screen'>
            <div className='flex w-full h-full'>
                <div className='fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto '>
                    <Sidebar/>
                </div>
                <div className='lg:pl-[264px] w-full'>
                    <div className='mx-auto max-w-screen screen-2xl h-full '>
                        <Navbar/>
                        <main className='h-full py-6 px-8 '>  
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;