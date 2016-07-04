import React from 'react';
import { Route, IndexRoute } from 'react-router';
// Route used to define a match between a URL and components
// IndexRoute
import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

export default (
  // ex. google.com/ => renders App
  // if route == / , then show app then PostsIndex (IndexRoute only matches Route path)
  // the Greeting path is a child of the App parent, therefore, must render this.props.children in the parent
  // :id is a path parameter that essentiall pulls from this.props.params.id
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
