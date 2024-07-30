# Mental Health Hospital Website

Welcome to the Mental Health Hospital Website repository! This project is a web application designed to provide support and information for individuals seeking mental health services. It includes features such as appointment scheduling, patient management, and resource sharing.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Mental Health Hospital Website is dedicated to offering comprehensive mental health services. This platform allows patients to schedule appointments, access resources, and manage their profiles, ensuring they receive the support they need.

## Features

- User authentication and profile management
- Appointment scheduling and management
- Resource library with articles and videos on mental health
- Secure data storage and handling
- Responsive design for accessibility on various devices

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/boi-network12/herbal.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd mental-health-hospital
   ```

3. **Install the dependencies:**

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

4. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project and obtain the Firebase configuration.
   - Create a `.env` file in the root directory and add your Firebase configuration:

     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. **Start the development server:**

   ```bash
   yarn start
   ```

   or

   ```bash
   npm start
   ```

## Usage

Once the development server is running, you can access the website at `http://localhost:3000`. Users can register, log in, schedule appointments, and access various mental health resources.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router for navigation
  - Context API for state management
  - Material-UI for UI components

- **Backend:**
  - Firebase Authentication for user management
  - Firebase Firestore for database
  - Firebase Hosting for deployment

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or inquiries, please contact:

- Okolo Kamdilichukwu Samuel
- Email: kamdilichukwu2020@gmail.com

Thank you for using the Mental Health Hospital Website!
