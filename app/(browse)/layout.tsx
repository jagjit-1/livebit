import { Navbar } from "./_components/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}

export default HomeLayout;