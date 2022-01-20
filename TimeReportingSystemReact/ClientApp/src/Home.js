import { Link, useHistory } from "react-router-dom";
import Auth from "./Auth";

const Home = () => {
    return (
        <div className="container">
            <main className="pb-3">
                <Info />
                <Buttons />
            </main>
        </div>
    );
};

const Info = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Time Management System</h1>
            <p>All your projects in one place!</p>
        </div>
    )
}

const Buttons = () => {

    const history = useHistory()

    const logout = () => {
        Auth.logout(() => {
            history.push("/")        
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg">
                    <Link className="btn btn-lg btn-primary col-12" to="/activities">Activities management</Link>
                </div>
                <div className="col-lg">
                    <Link className="btn btn-lg btn-primary col-12" to="/reports">Reports section</Link>
                </div>
                <div className="col-lg">
                    <button className="btn btn-lg btn-danger col-12" onClick={logout}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Home;