import { SmallBodyText } from './Typography';


const LoadingComponent = () => {
    return (
        <div className={`w-full h-fit bg-transparent p-8 mx-auto text-center`}>
            <SmallBodyText>{`...Loading`}</SmallBodyText>
        </div>
    );
};

export default LoadingComponent;
