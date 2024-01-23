import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectUser } from '../../services/user/selector';

interface IProps {
    authOnly?: boolean;
    component: React.ReactElement;
}

function ProtectedRoute({ authOnly = true, component }: IProps) {
    const user = useSelector(selectUser);
    const isAuthChecked = useSelector(selectIsAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (authOnly && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!authOnly && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ authOnly = false, component }: IProps) => <ProtectedRoute authOnly={false} component={component} />;
