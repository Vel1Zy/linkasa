import {addDoc} from "firebase/firestore"
import {createID} from "./IDController"

const createFeedbackForm = async (questions : string[]) => {
    const form : FeedbackForm = {
        feedbackFormID : 'feedback-form-' + createID(),
        questions : questions
    }

    try {
        await addDoc()
    } catch (error) {
        
    }
}

export { createFeedbackForm } 
