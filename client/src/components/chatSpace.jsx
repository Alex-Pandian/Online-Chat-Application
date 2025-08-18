import InputField from "./inputField";

const ChatSpace = () => {
    return (
        <div className="flex-1 bg-gray-600 text-white p-6 shadow-lg flex flex-col justify-between items-center">
            <h1>messages</h1>
            <InputField/>
        </div>
    );
};

export default ChatSpace;