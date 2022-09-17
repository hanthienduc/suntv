# Netflix clone build with Next.js + Tailwind CSS 


## [Live Demo](https://suntv.vercel.app/)

## Features
- User Authentication
- Display Popular Movies and TV Shows
- Add to favorite list
- Subscription with stripe API
- Search movies

## Preview

### User Authentication
![LoginLogout](https://i.imgur.com/wiwLnbI.png)
### Home Page
![Home](https://i.imgur.com/lldT5Cn.png)
### TV Show
![TV Show](https://i.imgur.com/4Cj0YFw.png)
### Search
![Search](https://i.imgur.com/4Cj0YFw.png)
### Accout
![Account](https://i.imgur.com/eW60Owk.png)
### Stripe Payment
![Stripe Payment](https://i.imgur.com/cnkEh7b.png)

## Dependencies, Tools, and Libraries
- NextJS
- Firebase
- TailWindCSS

## Install and Setup in your local
- Clone the repo.
- Navigate to project directory and in the command run npm install.
- Add .env.local file and add NEXT_PUBLIC_API_KEY=<<YOUR_TMDB_API_KEY>>.
- Create and Setup Firebase Auth and Firebase Store, also add stripe payment extentions, follow the instructions to install the extention.
- Create and add new Products in the Stripe API Dashboard 
- Connect it with firebase.
- In the command line run npm run dev to start the app 
- The app is running on http://localhost:3000

