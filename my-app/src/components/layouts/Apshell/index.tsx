import Navbar from "../navbar";
type ApshellProps = {
    children: React.ReactNode;
}
const AppsShell = (props: ApshellProps) => {
    const { children } = props;
    return (
        <main>
            <Navbar />
            {children}  
        </main>
    );
};
export default AppsShell;