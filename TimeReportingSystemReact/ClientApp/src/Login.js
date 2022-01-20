import Auth from './Auth';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const schema = yup.object().shape({
        username: yup.string().ensure().trim().required().min(3),
    });

    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        Auth.login(data.username, () => {
            history.push('/home');
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-3" align="center">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            required 
                            className="form-control"  
                            placeholder="Username" 
                            name="Username" 
                            width="30%"
                            {...register('username')}
                        />
                        <p className='text-danger' width="30%">
                            {errors.username?.message}
                        </p>
                        <input 
                            className="btn btn-primary" 
                            type="submit" 
                            value="Sign in" 
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

const Expired = () => {
    return (
        <div className="jumbotron text-center">
            <h1>You have been logged out</h1>
            <p>Please, press below button to come back to login page</p>
            <Link className="btn btn-success" to="/">Go to login page</Link>
        </div>
    )
}

export {
    Login,
    Expired
};