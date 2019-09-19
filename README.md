# React Router

![React Router Logo](./react-router-logo.png)

## Learning Objectives

- Use React Router's `BrowserRouter`, `Link`, `Route`, `Redirect`, and `Switch`
  components to add navigation to a React application
- Review the React component lifecycle and use component methods to integrate
  with API calls
- Talk about SPAs

## Framing (5 min / 0:05)

Up to this point, our React applications have been limited in size, allowing us
to use basic control flow in our components' render methods to determine what
gets rendered to our users. However, as our React applications grow in size and
scope, we need an easier and more robust way of rendering different components.
Additionally, we will want the ability to set information in the url parameters
to make it easier for users to identify where they are in the application.

React Router, while not the only, is the most commonly-used routing library for
React. It is relatively straightforward to configure and integrates with the
component architecture nicely (since it's just a collection of components).

We will configure it as the root component in a React application. Then we'll
tell it to render other components within itself depending on the path in the
url. This way we don't have to reload the entire page to swap out some data.

Don't confuse it with the express router! They do different things, though they
both operate based on paths.

## We Do: [React Bitcoin Prices](https://git.generalassemb.ly/dc-wdi-react-redux/react-bitcoin-prices) Setup (5 min / 0:10)

Let's get set up with the react bitcoin price checker!

## You Do: Axios & Coindesk API (5 min / 0:15)

We will be using [Axios](https://github.com/axios/axios) to query the Coindesk
API in this exercise. Take 5 minutes to read and test out (using postman or the
browser) the API docs below

[Coindesk API](https://www.coindesk.com/api/)

Also, install the
[React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
chrome extension if you haven't already. It'll come in very handy for inspecting
components.

## You Do: Examine Current Codebase (15 min / 0:30)

Since we're starting off with a project that already has some scaffolding built
out, we should spend some time getting our bearings.

Take 10 minutes and read through the code to familiarize yourself with the
codebase with a partner or in groups of 3. Prepare to discuss your answers the
following questions:

1. What dependencies is the application currently using? Where can I find
   information on them?
2. What is the purpose of `ReactDOM.render()`? What file is this method being
   called in?
3. Where are the components of our application located? Why might we want to
   separate them into their own folders?
4. Where is state located in our application? Is state being passed down to
   other components?
5. Look at the Price component. What props is it expecting to be passed?
6. Where is our application getting data from? How is it accomplishing this?

## We Do: React Router Setup (10 min / 0:40)

Currently, we are rendering just the App component, which renders the Home
component. Let's bring in React Router and set it up to allow us to display
multiple components.

When working with a new library, it's useful to have
[the documentation](https://reacttraining.com/react-router/web/guides/quick-start)
handy!

### Importing Dependencies

First, we need to install `react-router` and `react-router-dom` as dependencies
in `package.json`. Running `npm install` with arguments should automatically do
this for us.

```sh
npm install react-router react-router-dom
```

To configure our current application to use React Router, we need to modify the
root rendering of our app in `index.js`. We need to import the `Router`
component and place it as the root component of our application. `Router` will,
in turn, render `App` through which all the rest of our components will be
rendered:

```jsx
// index.js
import { BrowserRouter as Router } from "react-router-dom";

//...

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

> Note that we are aliasing `BrowserRouter` as `Router` here for brevity.

By making `Router` the root component of our app, it will pass down several
router-specific objects to its child components. Things like current location
and url can be accessed or changed. Additionally, in order to use the other
routing components provided by React Router, a `Router` parent component is
necessary.

Next, in `App.js`, we need to import all of the other components we want to use
from React Router.

The three main ones we're going to use today are:

```jsx
<Route />
<Link />
<Switch />
```

Let's go ahead and import just route and link for now, we'll cover switch later.

```js
// src/components/App/App.js

import { Route, Link } from "react-router-dom";
```

Now that we have access to these components, we need to modify the `App`
component's `render()` method to set up navigation. The basic structure we will
use is this:

```jsx
// src/components/App/App.js

render() {
  return (
    <div>
      <nav>
      // the link component produces an a element
        <Link to=""></Link>
        <Link to=""></Link>
      </nav>
      <main>
        // routes render the specified component we pass in
        <Route path="" render={}/>
        // we can give either a render or a component prop.
        <Route path="" component={}/>
      </main>
    </div>
  )
}
```

> **Link** - a component for setting the URL and providing navigation between
> different components in our app without triggering a page refresh. It takes a
> `to` property, which sets the URL to whatever path is defined within it. Link
> can also be used inside of any component that is connected to a `Route`.

> **Route** - a component that renders a specified component (using either
> `render` or `component`) based on the current url (`path`) we're at. `path`
> should probably match a `<Link to="">` defined somewhere.

Now let's modify the render method in `App.js` to include our Link and Route
components.

```jsx
// src/components/App/App.js

render() {
  return(
    <div>
      <nav>
        <Link to="/">
          <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" alt=""/>
          <h1>Bitcoin prices</h1>
        </Link>
      </nav>
      <main>
        <Route path="/"
          component={Home}
        />
      </main>
    </div>
  )
}
```

Great! But this doesn't do anything because we're already on the homepage.

Also, note that we used `component` in this case to display our home component.
We're doing that because we just want to display it without any changes - we're
not passing any props in, we're not modifying anything.

## You do: Add a Second Route and Link (10 min / 0:50)

> 5 minute exercise / 5 minute review

- Using the above instructions as a guide, add a new Link to `/currencies` and a
  route to match it. What component do you think you want to render?

<details>
  <summary>Solution</summary>

```jsx
// src/Components/App/App.js
//...
import Currencies from '../Currencies/Currencies'

// ...

render() {
  return(
    <div>
      <nav>
        <Link to="/">
          <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" alt=""/>
          <h1>Bitcoin prices</h1>
        </Link>
        <Link to="/currencies">Currency List</Link>
      </nav>
      <main>
        <Route path="/"
          component={Home}
        />
        <Route path="/currencies"
          component={Currencies}
        />
      </main>
    </div>
  )
}
```

</details>

Now we've got two components and two routes. Perfect. Let's take a look at our
currencies component and see what we need to do to make it work.

This a good point to talk about React Router's
[Route Props](https://reacttraining.com/react-router/web/api/Route/route-props).

## We do: Currencies component (5 min / 0:55)

If we look at this component we see a long list of links. Note that the links
are using regular `<a>` tags.

What happens if we click on a link? It works, but the whole page reloads! Gross.
Let's fix that.

Go ahead and replace the `a` tag with a `<Link>` component. Make the `to` prop
value equal to the `href` value.

```jsx
// src/Components/Currencies/Currencies.js
import { Link } from 'react-router-dom'

//...

  render() {
    let list = listOfCurrencies.map(item => {
      return (
        <div className="currency" key={item.currency}>
          <p><Link to={"/price/"+ item.currency}>{item.currency}</Link>: {item.country}</p>
        </div>
      )
    })
  }

  // ...
```

Great! Now go back to the page and click the link again, what happens?

**MAGIC!**

![shia](https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif)

It changes the route for us (notice the URL changing) but we don't have any
routes set up to match that. Let's do that next.

## Break (10 min / 1:05)

## You do: Prices Component (10 min / 1:15)

> 5 min exercise, 5 min review

Back in `App.js`, we need to add another `<Route>` component. This time though,
we want to include a parameter.

Look at the URL that we're on after clicking on a currency. Then look at the
`Price` component. How might you write the `path` prop to make it work?

> Hint: This part is just like defining a route with a param in express.

## We do: Fix prices component (25 min / 1:40)

We've added a route but not everything will work yet. HOW COME!?

There are a couple things we need to fix.

Firstly, we have to make sure we're using `render` instead of `component` in our
route. That's because we're going to be passing some props into our component.

```jsx
//...
<Route path="/price/:currency" render={() => <Price />} />
//...
```

Now we need to add a couple things to `<Price />`

We've got a function in this (`App.js`) component called setPrice. let's pass
that in.

```jsx
<Route
  path="/price/:currency"
  render={() => <Price setPrice={this.setPrice} />}
/>
```

We also have to pass our URL parameter into `<Price />`. This is where the arrow
function comes in to play.

```jsx
<Route
  path="/price/:currency"
  render={routerProps => <Price setPrice={this.setPrice} {...routerProps} />}
/>
```

> The `...` (spread operator) is allowing us to "destructure" the props object
> being passed by `Router` and apply each of its key/value pairs as props on the
> `Price` component.

Finally, we need to pass in the current component's state. We can also use the
spread operator for that.

```jsx
<Route
  path="/price/:currency"
  render={routerProps => (
    <Price setPrice={this.setPrice} {...routerProps} {...this.state} />
  )}
/>
```

### Spread explained

The `...` syntax looks funny, so let's step aside and show you something that
might be more familiar.

Open up quokka or your favorite interactive javascript environment and follow
along.

Let's start with two objects with a few properties in them.

```js
let shed = {
  color: "red",
  spiders: true,
  contains: ["lawnmower", "dirt", "flashlight"]
};

let house = {
  doors: 3,
  garage: true
};
```

Using the spread operator we can unpack the values in shed and place them all
into another object.

Let's rewrite this a bit.

```js
let shed = {
  color: "red",
  spiders: true,
  contains: ["lawnmower", "dirt", "flashlight"]
};

let house = {
  doors: 3,
  garage: true,
  ...shed
};

console.log(house);
//​ ​​​​{
//   doors: 3,​​​​​
//   garage: true,​​​​​
//​​ ​​​  color: 'red',​​​​​
//​ ​​​​  spiders: true,​​​​​
//​ ​​​​  contains: [ 'lawnmower', 'dirt', 'flashlight' ]
// }​​​​​
```

We can do the same thing with arrays.

```js
let contains = ["lawnmower", "dirt", "flashlight"];

let items = ["banana", ...contains];

console.log(items);
// ['banana', 'lawnmower', 'dirt', 'flashlight']
```

Now let's apply this to the router!

We know what our state object looks like, so we can use that as an example.

```js
this.state = {
  price: null
};
```

This turns into:

```js
<Price price={this.state.price} />
```

If we use the react dev tools, we can see what props have been passed down from
the `routerProps` object.

```js
let routerProps = {
  history: {
    /* stuff in here */
  },
  location: {
    /* stuff in here */
  },
  match: {
    /* stuff in here */
  }
};
```

So if we spread the routerProps object, we'll get something like this:

```js
<Price
  history={ /* stuff in here */ }
  location={ /* stuff in here */ }
  match={ /* stuff in here */ }
>
```

Putting it all together, using the spread operator turns this:

```jsx
<Price setPrice={this.setPrice} {...routerProps} {...this.state} />
```

Into this:

```jsx
<Price
  setPrice={this.setPrice}
  history={ /* stuff in here */ }
  location={ /* stuff in here */ }
  match={ /* stuff in here */ }
  price={this.state.price}
/>
```

Super cool right?

![shia](https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif)

We still have some weird display quirks, and for that, we'll use `<Switch>` to
fix them.

## Using Switch (10 min / 1:50)

Switch works just like the switch/case statements in javascript. We're comparing
string values (in this case, routes) and executing conditions (rendering
components) based on what matches turn out true.

Since we're not using switch right now, we'll see something like this:

![preswitch](./images/pre-switch.png)

There are two components stacked on top of each other! The Home and the
Currencies component. That's silly.

> Why does this happen?

There are two ways to handle this: using the Switch component, or specifying
`exact` on routes.

Let's look at our routes in `App.js` again:

```jsx
<Route path="/"
  component={Home}
/>
<Route path="/currencies"
  component={Currencies}
/>
<Route
  path="/price/:currency"
  render={(routerProps) => <Price setPrice={this.setPrice} {...routerProps} {...this.state} /> }
/>
```

Try putting `exact` on the `/` path route component.

```js
<Route path="/" exact component={Home} />
```

> Note: this is equivalent to putting `exact=true`

Beautiful! this is a great solution, unless we have many different routes.

If we had a list of routes like:

- `/currencies`
- `/currencies/new`
- `/currencies/:id` etc

we would have to put `exact` on `/currencies` or else, any time we went to
`/currencies/something` it would match both the root (`/currencies`) AND the
`/currencies/something` routes and both would be rendered.

We can avoid all this by just using `<Switch />`.

Back in `App.js`, let's import the `<Switch />` component and then wrap all of
our routes in it.

```jsx
import { Route, Link, Switch } from 'react-router-dom'

render() {
  return(
    <div>
      <nav>
        <Link to="/">
          <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" alt=""/>
          <h1>Bitcoin prices</h1>
        </Link>
        <Link to="/currencies">Currency List</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/"
            exact
            component={Home}
          />
          <Route path="/currencies"
            component={Currencies}
          />
          <Route
            path="/price/:currency"
            render={(routerProps) => <Price setPrice={this.setPrice} {...routerProps} {...this.state} /> }
          />
        </Switch>
      </main>
    </div>
  )
}
```

So easy!

![shia](https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif)

## Redirects

Redirects using react router are incredibly easy. Redirect is just another
component we can import and use by passing it a few props.

- Import the `Redirect` component from `react-router-dom`
- Add another route called `/currency`
- Instead of rendering one of our components, put the `Redirect` component.

```js
<Route path="/currency" render={() => <Redirect to="/currencies" />} />
```

Redirect only requires a `to` prop which tells it what path to redirect to.

## Wrapping Up (Remainder of Class)

Here's a rough outline of how you should go about building react apps! Follow
these suggestions, or don't, but they will probably help you a lot if you do them
in order. I suggest reading through all of the steps before you start so you can 
become familiar with the big picture of the entire process.

1. Start a new app using `create-react-app`. Call it user-router or something similar, 
it doesn't matter. You will be building four components (not including App.js). 
Each one will render something different:

| Component | Renders                                   | Route         |
| --------- | ----------------------------------------- | ------------- |
| Home      | "This is the homepage"                    | /             |
| Greet     | A greeting from a url parameter passed in | /greet/:param |
| Users     | A list of users                           | /users/       |
| NewUser   | A form that lets you add a username       | /users/new    |

1. Set up `react-router` like we did in this lesson, at the top level. What 
is the top level of a React app?

1. Build out each component with placeholders to render something. Do this first, before 
starting to add state, props, or functionality.

1. Set up your routes so that each route only displays the appropriate component.

1. Plan out where you think your state should live. If you have to share state
between multiple components, what's the best place to keep it? Think about what your 
state needs to contain.

1. Initialize your state and pass it down to the appropriate components.

1. Wire up those components to be able to display and update the state as
necessary. Add the functionality to have the greet component receive and display a
parameter.

1. Marvel at your creation and your progress after only 7 weeks of programming!
