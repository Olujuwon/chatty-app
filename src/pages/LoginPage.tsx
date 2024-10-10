import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {SmallBodyText} from "../components/Typography.tsx";


const LoginPage:React.FC<object> = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginUser = async (event:React.SyntheticEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const user = await login({userName: username, password: password});
        if (user.userName)navigate('/messages')
        else alert("An unexpected error occurred,Please try again");
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return(
        <form className={`flex flex-col gap-y-3 place-items-center justify-center py-[65%]`}
              onSubmit={handleLoginUser}>
            <input placeholder='Username' className={`outline-0 w-3/4 mx-auto h-11 pl-2 rounded text-sm`}
                   onChange={(event) => setUsername(event.currentTarget.value)}
                   value={username} aria-label='Username'
            />
            <input placeholder='Password' className={`outline-0 w-3/4 mx-auto h-11 pl-2 rounded text-sm`}
                   onChange={(event) => setPassword(event.currentTarget.value)}
                   value={password} type="password" aria-label='Password'
            />
            <button
                type='submit'
                disabled={isDisabled}
                className={`h-10 w-3/4 mx-auto text-[color:var(--color-white)] 
                ${isDisabled ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'} rounded`}>
                <SmallBodyText
                    className={`!text-[color:var(--color-white)] !font-semibold`}>
                    Login
                </SmallBodyText>
            </button>
            <Link className={`mx-auto mt-4 cursor-pointer`} to='/auth/register'>
                <SmallBodyText>
                    Not registered? Register here
                </SmallBodyText>
            </Link>
            <SmallBodyText>
                Powered by React.js
            </SmallBodyText>
        </form>
    )
}

export default LoginPage;