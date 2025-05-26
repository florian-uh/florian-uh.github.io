import Navbar from './Navbar';

export default function Header() {
    return (
        <header>
            <div className="top-header">
                <Navbar />
                <div className="top-right">
                    <button className="login">Login</button>
                    <button className="signup">Sign Up</button>
                </div>
            </div>
            <div className="bottom-header">
                <h1>A modern publishing platform</h1>
                <p>Grow your audience and build your online brand</p>
                <div>
                    <button className="start">Start for Free</button>
                    <button className="learn">Learn More</button>
                </div>
            </div>
        </header>
    );
}