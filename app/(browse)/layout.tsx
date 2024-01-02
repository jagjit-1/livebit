import { Suspense } from "react";
import { Toaster } from "sonner";

import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                    <Container>
                        <Toaster theme="light" position="bottom-center" />
                        {children}
                    </Container>
                </Suspense>
            </div>
        </div>
    );
}

export default HomeLayout;