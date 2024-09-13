import {Link} from "react-router-dom";
import useCurrentTheme from "../hooks/useCurrentTheme.tsx";



const LandingPage = () => {
    const {currentTheme} = useCurrentTheme();
    const light_scheme_image = 'https://firebasestorage.googleapis.com/v0/b/chatty-41daf.appspot.com/o/conversation.png?alt=media&token=f74cae69-8633-4ec8-9927-d77e12edafe8'
    const dark_scheme_image = 'https://firebasestorage.googleapis.com/v0/b/chatty-41daf.appspot.com/o/conversation_dark.png?alt=media&token=ca006827-3360-4f70-83ba-0a886e521d52'
    return (
        <>
            <h1 className={`text-2xl font-bold px-4 pt-4 text-[color:var(--color-main)]`}>Chatty App</h1>
            <p className={`text-lg px-4 text-[color:var(--color-dark)]`}>Welcome to chatty app</p>
            <div className={`w-[96%] h-[60vh] mx-auto pt-16 rounded-lg`}>
                <img src={currentTheme === 'dark' ? dark_scheme_image : light_scheme_image}
                     alt='conversation' className={`w-full h-full rounded-lg object-cover`}/>
            </div>
            <p className={`pt-8 px-4 text-[color:var(--color-dark)]`}>Features :</p>
            <ul className={`mx-auto mt-1 px-4 cursor-pointer text-[color:var(--color-dark)]`}>
                <li className={`pl-4`}>Search for users to chat with</li>
                <li className={`pl-4`}>Add or follow</li>
                <li className={`pl-4`}>Start chatting in realtime</li>
            </ul>
            <div  className={`ml-4 mt-12`}>
                <Link
                    className={`p-4 bg-[color:var(--color-main)] mx-auto mt-4 cursor-pointer text-[color:var(--color-white)]`}
                    to='/auth/login'>Get started</Link>
            </div>
        </>
    )
}


export default LandingPage;