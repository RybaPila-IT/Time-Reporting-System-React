import { Redirect, Route } from "react-router-dom"
import Auth from "./Auth"

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (Auth.isAuthenticated()) {
                    return <Component {...props}/>
                }
                return <Redirect to="/expired" />
            }
        }/>
    )
}