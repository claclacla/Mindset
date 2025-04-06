## Mindset
### Also known as my glory days as a baseball player

The application allows an administrator to view and manage users' training sessions.

Each session is displayed with the user's first and last name, their age, and the length of the route.

It is possible to insert new training sessions directly from the form page or through the natural language prompt. For example:

```bash
Insert a new session for the user Simone Adelchino who ran for 45 km and he is 45 years old
```

It is possible to add new sessions and automatically receive new ones via a websocket.

The only user present is from the baseball team I played for several years ago—the only time in my life I truly practiced sports. I have immortalized that moment, filled with glorious victories, in this application. 

The credentials are written directly on the login page, just like every secure and well-protected application.

## Getting Started

For the basic functionality of the application without the websocket, you can directly run the command:

```bash
npm run dev
```

In this case, the Next.js development environment is started.  

Otherwise, you can build the Docker images in the repository using the following command:

```bash
docker-compose up --build
```

In this case, two Docker containers will be built and executed: one for the main application and the other for the websocket, which sends notifications about the creation of new training sessions.

## Usage

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The available features are:  

- the application is responsive and can be used on mobile devices
- Authentication with error handling for incorrect credential input.  
- Data storage in the application's local storage to manage page reloads.  
- Display of training sessions already present in the database.  
- Adding a new session.  
- Receiving new sessions via websocket.  

If the websocket has also been built, it is possible to connect to it and send notifications directly to the main application. In my case, I installed `wscat` to do this.

```bash
npm i wscat
```

The websocket is running on port 8080 of the machine: [http://localhost:8080](http://localhost:8080).  

To use `wscat` and send notifications to the main application, run the following command:

```bash
wscat -c ws://localhost:8080
```

Typing anything in the command line will send the data for a new training session.  

On the first submission, the session will be added to those stored locally in the application. On the second submission, it will not be added because a session with ID "12" is already present.

## Stack

- Typescript
- React
- MUI
- Tailwind
- Next.js
- Firebase: authentication handling
- Vertex API: training sessions creation via prompt

## Testing

For unit testing use the following command:

```bash
npm test
```

For e2e testing use the following command:

```bash
npx playwright test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.