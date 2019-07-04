#Grocery-Share
 - A real time, shared application allowing for users to store grocery lists in a public format and update in real-time. This app is currently deployed [here](https://grocery-share.herokuapp.com/). 
 - Try it out for yourself with the following test account:

 ```
 email: tester@example.com
 password: testpass

 Account 2: 

 email: tester2@example.com
 password: testpass

 ```

 ##Purpose 

 ### Problem As Given: 
 - Create a grocery list web-application that can be shared in real-time by multiple people.

 ### Functional Requirements (Minimum):
  1. Save, Update, and Delete items to/from a database of my choosing.
  2. Authenticate users - allow the same user to be signed in from multiple devices.
  3. Allow add, edit, delete, "mark as purchased" and "unmark as purchased" on each item.
  4. Keep the list synced in real time with reach device.
  5. Accompany the code with a full test suit.
  6. Deploy the site to a web host.

##Solutions: 

  To tackle this assignment, first I needed to identify the technologies I would be using in this project. I settled on the following, with a brief reason as to why, as well as my comfort-level with each.

## Tech Stack:
  - [Node.js](https://nodejs.org/en/)
    - I feel most at home within a complete JavaScript environment, so laying my foundations in Node.js where a natural choice. I'll be using react for the front-end, I'll get more into detail about that shortly. But suffice to say my goal here was to mitigate the challenge that I'd face when putting together the front end of this project. 
  - [Express](https://expressjs.com/)
    - I chose express both to familiarity with the technology, but also its modularity. Express is light-weight, flexible, and gives you a lot of freedom to choose what parts you want and avoid unncessary bloat within your project.
  - [React](https://reactjs.org/)
   - I chose react because it would give me a clear path towards making this project update in real-time with the need for a page-refresh thanks to React's utilization of a Virtual Document Object Model and its ability to process updates coming from my back-end while providing a seemless user experience. My comfortability with React is less solid here than with my chosen back-end technology. I knew using this would be a challenge, not using it within the last 6 months but I was confident of my ability to refresh myself and pick up a few new things along the way. 
  - [PostgreSQL](https://www.postgresql.org/)  
    - I chose Postgres due to comfortability with the technology, and its ability to quickly scale with my project as necessary. Postgres also interfaces well with the design of this project which would make database usage a stable process.

## More Coming Soon