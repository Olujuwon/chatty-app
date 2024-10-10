import React, { useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {IUser} from "../types";
import {useAuth} from "../context/AuthContext.tsx";


const isEmailValid = (email : string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const RegisterPage:React.FC<object> = () => {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');

    const handleRegisterUser = async (event:React.SyntheticEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const user = await register({email:email, password:password, userName:username, bio: bio}) as Partial<IUser>;
        if (user.userName){
            navigate("/messages");
        }else {
            alert("An unexpected error occurred,Please try again");
        }
    }

    const handleEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const emailValue: string = event.currentTarget.value;
        setEmail(emailValue);
        if (!isEmailValid(emailValue)) {
            setError('Invalid email format.');
        } else {
            setError('');
        }
    }

    const isDisabled = username.length === 0 || email.length === 0 || password.length === 0;

    return(
        <>
            <form className={`flex flex-col gap-y-3 place-items-center justify-center py-[65%]`}
                  onSubmit={handleRegisterUser}>
                <input placeholder='Username' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={(event) => setUsername(event.currentTarget.value)}
                       value={username} aria-label='Username'/>
                <input placeholder='Email' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={handleEmailFieldChange}
                       value={email} aria-label='Email'/>
                {error && <p className={`w-3/4 mx-auto pl-2 text-[color:var(--color-dark)]`}>{error}</p>}

                <input placeholder='Short bio' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={(event) => setBio(event.currentTarget.value)}
                       value={bio} aria-label='Bio'/>

                <input placeholder='Password' className={`outline-0 w-3/4 mx-auto h-11 pl-2`}
                       onChange={(event) => setPassword(event.currentTarget.value)}
                       value={password} type="password" aria-label='Password'/>
                <button
                    className={`h-10 w-3/4 mx-auto text-[color:var(--color-white)] 
                    ${isDisabled ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'}`}
                    type='submit'
                    disabled={isDisabled}
                >Register
                </button>
                <Link className={`mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)]`} to='/auth/login'>Already
                    registered? Login here</Link>
                <p className='mx-auto mt-4 cursor-pointer text-[color:var(--color-dark)] text-xs font-light'>Powered by
                    React.js</p>
            </form>
        </>
    )
}

export default RegisterPage;