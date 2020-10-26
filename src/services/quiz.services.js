import axios from 'axios';

// for each question with an imageFile prop:
// 1. post the image to Cloudinary
// 2. remove the imageFile prop
// 3. add/overwrite an imageUrl prop
// returns the updated questions
export async function saveQuestionImages(quiz) {
    const {questions} = quiz;
    for (let question of questions) {
        if (question.imageFile) {
            const formData = new FormData();
            formData.append('file', question.imageFile);
            formData.append('upload_preset', 'quiz-maker');
            const response = await axios.post('https://api.cloudinary.com/v1_1/dswezohlv/image/upload', formData);
            question.imageUrl = response.data.url;
        }
        // delete the imageFile prop so that it's not written to the API
        delete question.imageFile;
    }
    return {...quiz, questions};
}