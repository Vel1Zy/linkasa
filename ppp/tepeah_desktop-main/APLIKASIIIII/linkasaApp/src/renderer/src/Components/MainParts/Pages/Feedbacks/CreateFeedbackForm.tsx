import {useState} from "react";

function CreateFeedbackForm() {
    const [questions, setQuestion] = useState<string[]>([])
    const [current, setCurrent] = useState('')

    const addHandle = () => {
        if(current === '') return
        questions.push(current)
        setCurrent('')
    }

    return (
        <div className="flex gap-3 flex-col w-1/2">
            <p className="font-bold text-xl tracking-wide">List Of Questions</p>
            {questions.map((q, i) => (
                <p key={i}>{i + 1}. {q}</p>
            ))}
            <div className="flex gap-2">
                <input
                        name="date"
                        className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                        placeholder="Create New Schedule"
                        type="text"
                        onChange={(o) => setCurrent(o.target.value)}
                        value={current}
                ></input>
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={addHandle}
                >
                    Add Schedule
                </button>
            </div>
            <button
                    className="w-1/2 border-none mt-2 bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none"
                    onClick={addHandle}
                >
                    Create The Feedback Form
                </button>
        </div>
    );
}

export default CreateFeedbackForm;
