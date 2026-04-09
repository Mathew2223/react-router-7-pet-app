import './App.css';
import React, { useState } from 'react';
import { 
    Routes,
    Route,
    Outlet,
    Link,
    NavLink,
    type NavLinkRenderProps,
    useParams,
    useNavigate,
    useSearchParams
} from 'react-router';

const App = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
    ]);

    const handleRemoveUser = (userId: string | undefined) => {
        setUsers((state) => state.filter((user) => user.id !== userId));

        navigate('/users');
    }

    return (
        <>
            <h1>React Router</h1>

            <Navigaion />

            <Routes>
                <Route element={<Layout />}>
                    <Route index path='home' element={<Home />} />
                        <Route path='users' element={<Users users={users} />}>
                            <Route path=':userId' element={<User onRemoveUser={handleRemoveUser} />} />
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

type UserProps = {
    onRemoveUser: (userId: string | undefined) => void;
}

type UsersProps = {
    users: User[];
};

const User = ({ onRemoveUser }) => {
    const { userId } = useParams();

    return (
        <>
            <h2>User: {userId}</h2>

            <button type='button' onClick={() => onRemoveUser(userId)}>
                Remove
            </button>

            <Link to="/users">Back to Users</Link>
        </>
    )
}

const Users = ({ users }: UsersProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('name') || '';

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;

        if (name) {
            setSearchParams({ name: event.target.value });
        } else {
            setSearchParams();
        }
    };

    return (
        <>
            <h2>Users</h2>

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
            />

            <ul>
                {users.filter((user) => 
                    user.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                )
                .map((user) => (
                    <li key={user.id}>
                        <Link to={user.id}>{user.fullName}</Link>
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