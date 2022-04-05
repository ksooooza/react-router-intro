# React Router

![React Router Logo](./react-router-logo.png)

Up to this point, our React applications have been limited in size, allowing us
to use basic control flow in our components' render methods to determine what
gets rendered to our users. However, as our React applications grow in size and
scope, we need an easier and more robust way of rendering different components.
Additionally, we will want the ability to set information in the URL parameters
to make it easier for users to identify where they are in the application.

React Router, while not the only, is the most commonly-used routing library for
React. It is relatively straightforward to configure and integrates with the
component architecture nicely (since it's also a collection of components).

We will configure it as the root component in a React application. Then, we'll
tell it to render other components within itself depending on the path in the
URL. This way we don't have to reload the entire page to swap out some data.

## Learning Objectives

- Use React Router's `BrowserRouter`, `Link`, `Routes`, `Route` and `useParams`
  components to add navigation to a React application.
- Use URL parameters to navigate to specific pages in React.
- Review the React component lifecycle and use lifecycle methods to integrate
  with API calls.

## We Do: Examine the Coindesk API

Today we will be building a React app using the
[Coindesk API](https://www.coindesk.com/api). Let's take a few minutes to
familiarize yourself with the API. Next, we'll see how it fits into our
codebase.

## You Do: Examine Current Codebase

Since we're starting off with a project that already has some scaffolding built
out, we should spend some time getting our bearings.

Take 10 minutes and read through the code to familiarize yourself with the
codebase with a partner. Prepare to discuss your answers the following
questions:

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

## React Router Setup

Currently, we are only rendering the App component, which renders the Home
component. Let's bring in React Router and set it up to allow us to display
multiple components.

When working with a new library, it's useful to have
[the documentation](https://reactrouter.com/docs/en/v6)
handy!

### Importing Dependencies

First, we need to install `react-router-dom` as a dependency in `package.json`.
Running `npm install` with arguments should automatically do this for us.

```sh
npm install react-router-dom
```

To configure our current application to use React Router, we need to modify the
root rendering of our app in `index.js`. We need to import the `Router`
component and place it as the root component of our application. `Router` will,
in turn, render `App` through which all the rest of our components will be
rendered:

```jsx
// src/index.js
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

The two main ones we're going to use today are `Link` and `Route`.

```js
// src/App.js

import { Link, Routes, Route } from "react-router-dom";
```

> **Link** - a component for setting the URL and providing navigation between
> different components in our app without triggering a page refresh. It takes a
> `to` property, which sets the URL to whatever path is defined within it. Link
> can also be used inside of any component that is connected to a `Route`.

> **Routes** - a component that we will write all of our routes in.

> **Route** - a component that renders a specified component (using `element`) based on the current url (`path`) we're
> at. `path` should probably match a `<Link to="">` defined somewhere.

Now let's modify the return in `App.js` to include our Link and Route
components.

```jsx
// src/App.js

return (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <a href="/currencies">Currencies</a>
    </nav>
    <main>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </main>
  </div>
);
```

Great! But this doesn't do anything because we're already on the homepage.

## You Do: Add a Second Route and Link

> 5 minute exercise / 5 minute review

Using the above instructions as a guide, add a new Link to `/currencies` and a
route to match it. What component do you think you want to render?

<details>
  <summary>Solution</summary>

```jsx
// src/App.js
//...
import Currencies from "./Currencies.jsx";

// ...

return (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/currencies">Currencies</Link>
    </nav>
    <main>
      <Route path="/" element={<Home />} />
      <Route path="/currencies" element={<Currencies />} />
    </main>
  </div>
);
```

</details>

Now we've got two components and two routes.

## Currencies Component

If we look at this component we see a long list of links. Note that the links
are using regular `<a>` tags.

What happens if we click on a link? It works, but the whole page reloads! Let's
fix that.

Go ahead and replace the `a` tag with a `<Link>` component. Make the `to` prop
value equal to the `href` value.

```jsx
import { Link } from "react-router-dom";
import currencies from "./currencies.json";

function Currencies() {
  return (
    <div>
      {currencies.map((currency) => (
        <h2>
          <Link to={`/price/${currency.currency}`}>{currency.currency}</Link>:{" "}
          {currency.country}
        </h2>
      ))}
    </div>
  );
}

export default Currencies;
```

Great! Now go back to the page and click the link again, what happens?

**MAGIC!**

## Parameters

Every time we click on a currency, React Router changes the route for us. Do you
notice the URL changing? How are we making these routes dynamic? We are using
what we call **parameters**. Route parameters are named sections of our path; they are placeholders (similar to variables or parameters) that
capture values at their location in a URL.

It changes the route for us (notice the URL changing) but we don't have any
routes set up to match that. Let's do that next.

### Add Price Component

Back in `App.js`, we need to add another `<Route>` component. This time though,
we want to include a parameter, which will be signified in the `path` prop with
a `:` followed by the name of the parameter.

Look at the URL that we're on after clicking on a currency. Then look at the
`Price` component. How might you write the `path` prop to make it work?

```js
<Route path="/price/:currency" element={<Price />}
```

We've added a route but not everything will work yet. HOW COME!?

It seems that something called `params` is undefined. We can use the [`useParams`](https://reactrouter.com/web/api/Hooks/useparams) hook to gain access to the url parameters within our component.

## Review Questions

- Why do we use `react-router-dom`?
- What does the `Route` component do?
- What does the `Link` component do?

## Hungry for More

- [Props.children](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)
- [React Router documentation](https://reacttraining.com/react-router/web)
