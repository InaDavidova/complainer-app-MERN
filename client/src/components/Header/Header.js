import {NavLink} from "react-router-dom";

export default function Header(){
    return (
        <header>
        <h1>Complainer App</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/form">Create Complaint</NavLink>
                <NavLink to="/posts">All complaints</NavLink>
            </nav>
        </header>
    );
}