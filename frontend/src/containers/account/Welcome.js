import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Welcome = (props) => {
    const { verifyUser } = useAuth();

    if (props.match.path === "/confirm/:confirmationCode") {
        verifyUser(props.match.params.confirmationCode);
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Account confirmed!</strong>
                </h3>
            </header>
            <Link to={"/login"} className="nav-link">
                Please Login
            </Link>
        </div>
    );
};

export default Welcome;
