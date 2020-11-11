# Quiz Maker (Front)

This is the React front-end of a little app for building simple multiple-choice question quizzes. I built it whilst teaching myself React. I wanted to build something that would read and write to a REST API and that included dynamic forms. It also uploads question images to [Cloudinary](https://cloudinary.com/). 

You can see the app in action [here](https://inspiring-bose-43ed73.netlify.app/). Note that it reads and writes to a Spring Boot API hosted on Heroku using free web dynos. As a consequence the few sample quizzes might take a few seconds to appear and/or your first save might take a little while to complete.

You can make it work locally using [json-server](https://github.com/typicode/json-server). Add a `.env` file to the project's root directory with the following variables:

- REACT_APP_API_URL=<your_api_url>
- REACT_APP_CLOUDINARY_URL=<your_cloudinary_api_url>
- REACT_APP_CLOUDINARY_UPLOAD_PRESET=<your_cloudinary_upload_preset>

The JSON file for json-server should look like this for starters:

```json
{
    "quizzes": []
}
```

You can sign up to Cloudinary and get 1GB of storage for free. You'll need to set an upload preset which can be done in Settings (toobar button showing a cog) | Upload tab.