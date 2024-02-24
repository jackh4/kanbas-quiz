import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
    return (
        <div className="d-flex">
            <div className="flex-fill">
                <ModuleList />
            </div>
            <div className="flex-grow-0 me-2 d-none d-lg-block">
                <Status />
            </div>
        </div>
    );
}
export default Home;