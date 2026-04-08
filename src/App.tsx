import './App.css';
import { Routes, Route, Outlet, Link, NavLink, type NavLinkRenderProps, useParams } from 'react-router';

const App = () => {
    const users = [
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
    ]

    return (
        <>
            <h1>React Router</h1>

            <Navigaion />

            <Routes>
                <Route element={<Layout />}>
                    <Route index path='home' element={<Home />} />
                    <Route path='users' element={<Users users={users} />}>
                        <Route path=':userId' element={<User />} />
                    </Route>
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    )
}

const Navigaion = () => {
    return <nav style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem"
    }}
    >
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
    </nav>
}

const Home = () => {
    return (
        <>
            <h2>Home</h2>
        </>
    );
};

type User = {
    id: string;
    fullName: string;
};

type UsersProps = {
    users: User[];
};

const User = () => {
    const { userId } = useParams();

    return (
        <>
            <h2>User: {userId}</h2>
            <Link to="/users">Back to Users</Link>
        </>
    )
}

const Users = ({ users }: UsersProps) => {
    return (
        <>
            <h2>Users</h2>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.fullName}`}>{user.fullName}</Link>
                    </li>
                ))}
            </ul>

            <Outlet />
        </>
    );
};

const NoMatch = () => {
    return (<p>There's no nothing here: 404!</p>);
}

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = () => {
    const style = ({ isActive }: NavLinkRenderProps) => ({
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <>
            <h1>React Router</h1>

            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <NavLink to="/home" style={style}>Home</NavLink>
                <NavLink to="/users" style={style}>Users</NavLink>
            </nav>

            <main style={{ padding: '1rem 0' }}>
                <Outlet />
            </main>
        </>
    )
}

export default App