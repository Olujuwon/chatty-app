import {Link} from "react-router-dom";
import useCurrentTheme from "../hooks/useCurrentTheme.tsx";
import {MainHeaderText, MediumBodyText, SmallBodyText} from '../components/Typography.tsx';



const LandingPage = () => {
    const {currentTheme} = useCurrentTheme();
    const light_scheme_image = 'https://firebasestorage.googleapis.com/v0/b/chatty-41daf.appspot.com/o/conversation.png?alt=media&token=f74cae69-8633-4ec8-9927-d77e12edafe8'
    const dark_scheme_image = 'https://firebasestorage.googleapis.com/v0/b/chatty-41daf.appspot.com/o/conversation_dark.png?alt=media&token=ca006827-3360-4f70-83ba-0a886e521d52'
    return (
        <>
            <MainHeaderText className={`!font-bold px-4 pt-4 !text-[color:var(--color-main)]`}>Chatty App</MainHeaderText>
            <MediumBodyText className={`px-4`}>Welcome to chatty app</MediumBodyText>
            <div className={`w-[96%] h-[60vh] mx-auto pt-16 rounded-lg`}>
                <img src={currentTheme === 'dark' ? dark_scheme_image : light_scheme_image}
                     alt='conversation' className={`w-full h-full rounded-lg object-cover`}/>
            </div>
            <MediumBodyText className={`pt-8 px-4`}>Features :</MediumBodyText>
            <ul className={`mx-auto mt-1 px-4 cursor-pointer text-[color:var(--color-dark)]`}>
                <li className={`pl-4`}><SmallBodyText>Search for users to chat with</SmallBodyText></li>
                <li className={`pl-4`}><SmallBodyText>Add interesting users</SmallBodyText></li>
                <li className={`pl-4`}><SmallBodyText>Start chatting in realtime</SmallBodyText></li>
            </ul>
            <div  className={`ml-4 mt-12`}>
                <Link to='/auth/login'>
                    <SmallBodyText
                        className={`w-fit p-4 bg-[color:var(--color-main)] mt-4 cursor-pointer 
                        text-[color:var(--color-white)] rounded`}>
                        Get started
                    </SmallBodyText>
                </Link>
            </div>
        </>
    )
}


export default LandingPage;