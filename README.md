# Grocery-Share
 - A real time, shared application allowing for users to store grocery lists in a public format and update in real-time. This app is currently deployed [here](https://grocery-share.herokuapp.com/). 
 - Try it out for yourself with the following test account:

 ```
 Testing Account 1: 
 email: tester@example.com
 password: testpass

 Testing Account 2: 
 email: tester2@example.com
 password: testpass

 ```

 ## Purpose 

 ### Problem As Given: 
 - Create a grocery list web-application that can be shared in real-time by multiple people.

 ### Functional Requirements (Minimum):
  1. Save, Update, and Delete items to/from a database of my choosing.
  2. Authenticate users - allow the same user to be signed in from multiple devices.
  3. Allow add, edit, delete, "mark as purchased" and "unmark as purchased" on each item.
  4. Keep the list synced in real time with reach device.
  5. Accompany the code with a full test suit.
  6. Deploy the site to a web host.

## Solutions: 

  To tackle this assignment, first I needed to identify the technologies I would be using in this project. I settled on the following, with a brief reason as to why, as well as my comfort-level with each.

### Tech Stack:
  - [Node.js](https://nodejs.org/en/)
    - I feel most at home within a complete JavaScript environment, so laying my foundations in Node.js where a natural choice. I'll be using react for the front-end, I'll get more into detail about that shortly. But suffice to say my goal here was to utilize something familiar to mitigate the challenge that I'd face when putting together the front end of this project. 
  - [Express](https://expressjs.com/)
    - I chose express both to familiarity with the technology, but also its modularity. Express is light-weight, flexible, and gave me a lot of freedom to choose what parts I wanted and avoid unncessary bloat within this project.
  - [React](https://reactjs.org/)
    - I chose React because it would give me a clear path towards making this project update in real-time without the need for a page-refresh thanks to React's utilization of a Virtual Document Object Model and its ability to process updates coming from my back-end while providing a seemless user experience. My comfortability with React is less solid here than with my chosen back-end technology. I knew using this would be a challenge, not using it within the last 6 months but I was confident of my ability to refresh myself and pick up a few new things along the way. 
  - [PostgreSQL](https://www.postgresql.org/)  
    - I chose Postgres due to comfortability with the technology, and its ability to quickly scale with my project as necessary. Postgres also interfaces well with the design of this project which would make database usage a stable process.

### Feature List

 - **User Authentication**
   - Users are able to sign-up, sign-in, and sign-out of the application. User passwords are salted and hashed before being stored within the database using *bcrypt*.
 - **Lists**
   - Users are able to create, edit, delete, and view public shopping lists.
 - **Items**
   - Users are able to create, edit, delete, and view items that exist within public shoppiing lists. When creating an item a user provides a name and a quantity needed.
 - **Real-Time Updating**
   - Users are able to update lists, and items located in a list with updates showing up across multiple devices in real-time.
 - **Marking Items as Obtained**
   - Users can make items as in or not in the cart. So they can in turn keep track of what is left and what they have in their cart already.

## Challenges

While I was able to complete the base-level requirements of this project, I ran into some challenges that resulted in me not implementing features or design facets that I would do differently looking back.

 - **React Familiarity**
   - I hadn't used React in over six months, to it wasn't fresh in my mind as I approached this project. I was committed to get back into the swing of it, but it took me a good portion of time to really get back up to speed while also learning to wire it together with the back-end. That said, utilizing React was one of my more difficult aspects of this project for me and we'll cover some more takeaways about why I felt that was the case in another section.
 - **REST API Creation**
   - When starting this project I felt comfortable creating a back-end application, but this was my first experience with creating a REST API. Learning this was a nice adventure and helped me draw more mental connections between HTTP Methods, status codes, and how to properly serve server-side data to a front-end client. My mentor also discussed REST arcitetchure which helped me make some final jumps here to get an implementation of those methods. It's definitely something I want to continue working with, and will likely be a large focus of my next personal project.
- **Styling**
  - This goes hand in hand with my familiarity with react, but the reasoning here I believe is two-fold. On one hand, I didn't properly anticipate how a particular design choice around the user sign-up/sign-in would affect my intended design choice. On the other hand, I didn't take users with multiple resolutions into account, by not designing with a mobile-first mindset.
  
### Specific Issues and Roadblocks

- **Navigation Bar/SignIn & SignOut Component Relationships**: One particular problem presented itsself late in the process, and that was my design of the parent/child component relationship between the navigation bar component and the sign-in/sign-up forms. My intent here had been to pass down a user state prop and send that data back to the navigation bar. I found that I couldn't get this to work as I really wanted it to. Another approach that I explored was passing it down within a `<Link />` as provided by react-router, but I couldn't get to a point where I was doing that successfully. Time issues prevented me from adjusting the component relationship to get the desired result. 
  - This challenge is the core of one of one of the things I would change about this project, this problem was one that ultimately had to inform my design choice. Rather than having seperate component views for both the 'Sign In' and 'Sign Out', they are displayed in the navigation which also thew off my choices in the design of the navigation bar. 
  - Though this challenge was frustrating and ultimately not one I was able to overcome within the project, it was a learning experience to allow me to see what doesn't work and how can improve that aspect in the future which in and of itsself is a valuable takeaway from this project.

- **Mobile Design** - This project, at this core, is best suited to a mobile first experience. A user won't have a computer with 1920x1080 resolution or a 24inch monitor in front of them. I made attempts to make things responsive and for the most part the page is responsive but its not responsive in a clean way. What I mean by that is that the application doesn't look clean as it goes through different view sizes. 
  - I was able to pick-up and utilize some new concepts in terms of responsive design and CSS. However, it also shows me here where my weaknesses lie and that I can put more time into mobile design concepts and media-queries for example.

   
   
