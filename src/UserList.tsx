import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from "./redux/rootReducer";
import {getUsersStart} from "./redux/users/userSlice";


const UserList = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        dispatch(getUsersStart());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};

export default UserList;
