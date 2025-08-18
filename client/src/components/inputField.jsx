const InputField = () => {

    const handleSubmit = () => {

    };

    return (
        <form className="inline-flex gap-3">
            <input
                className="rounded-full h-12 w-2xl border border-gray-800 p-5 bg-gray-800 focus:outline-none focus:border-gray-600 focus:shadow-2xl"
             type="text" placeholder="Type a message.."
            />
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="w-10 h-12 text-black hover:fill-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2"
                onSubmit={handleSubmit}>
                <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M22 12L2 3v7l13 2-13 2v7l20-9z" />
            </svg>
        </form>
    );
};

export default InputField;