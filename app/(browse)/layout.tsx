import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>

            </div>
        </div>
    );
}

export default HomeLayout;