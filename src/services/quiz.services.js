import axios from 'axios';

export async function fetchQuizzes() {
    const response = await axios.get(process.env.REACT_APP_API_URL);
    return response.data;
}

export async function fetchQuiz(quizId) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/${quizId}`);
    return response.data;
}

export async function postQuiz(quiz) {
    const modifiedQuiz = await saveQuestionImages(quiz);
    const response = await axios.post(process.env.REACT_APP_API_URL, modifiedQuiz);
    return response.data;
}

export async function putQuiz(quiz) {
    const modifiedQuiz = await saveQuestionImages(quiz);
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/${quiz.id}`, modifiedQuiz);
    return response.data;
}

export async function deleteQuiz(quizId) {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/${quizId}`);
    return response.data;
}

// for each quiz question with an imageFile prop:
// 1. post the image to Cloudinary
// 2. remove the imageFile prop
// 3. add/overwrite the imageUrl prop
// returns a copy of the updated quiz
export async function saveQuestionImages(quiz) {
    const {questions} = quiz;
    for (let question of questions) {
        if (question.imageFile) {
            const formData = new FormData();
            formData.append('file', question.imageFile);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
            question.imageUrl = response.data.url;
        }
        // delete the imageFile prop so that it's not written to the API
        // doing this outside of the loop so that the prop's deleted even if it's assigned an empty object
        delete question.imageFile;
    }
    return {...quiz, questions};
}