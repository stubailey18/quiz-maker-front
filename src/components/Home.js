import React from 'react';

export default function Home() {
    return (
        <>
            <p>This is the React front-end of a little app for building simple multiple-choice question quizzes. I built it whilst teaching myself React. I wanted to build something that would read and write to a REST API and that included dynamic forms. It also uploads question images to <a href="https://cloudinary.com/">Cloudinary</a>.</p>
            <p className="mb-1">You can see the app in action <a href="https://inspiring-bose-43ed73.netlify.app/">here</a> or make it work locally using <a href="https://github.com/typicode/json-server">json-server</a>. Add a .env file to the project's root directory with the following variables:</p>
            <ul>
                <li>REACT_APP_API_URL=&lt;your_api_url&gt;</li>
                <li>REACT_APP_CLOUDINARY_URL=&lt;your_cloudinary_api_url&gt;</li>
                <li>REACT_APP_CLOUDINARY_UPLOAD_PRESET=&lt;your_cloudinary_upload_preset&gt;</li>
            </ul>
            <p className="mb-1">The JSON file for json-server should look like this for starters:</p>
            <p><code>{'{ "quizzes": [] }'}</code></p>
            <p>You can sign up to Cloudinary and get 1GB of storage for free. You'll need to set an upload preset which can be done in Settings (toobar button showing a cog) | Upload tab.</p>
        </>
    );
}