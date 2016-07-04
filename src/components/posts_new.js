import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; // similar to connect from 'redux'
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // defining an object on PostNew class
  // react will search all parents of contexttypes to find router.
  // when you find it, assign it to this.context.router inside of the component
  // avoid using context unless working with react-router router
  static contextTypes = {
    router: PropTypes.object
  };

  // createPost is an action creator the returns a promise
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // Blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    // ES6 short hand for title = this.props.fields.title
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // Call handleSubmit when enter key or submit pressed
    // handleSubmit function tells reduxForm user is trying to send the form
    // Probably a good time to check validation on form
    // if invalid, then stop process
    // {...title} destructuring of object -> pass it to input but not as an object (rather seperate keys: values)
    // Calls helper function onSubmit and binds it to the props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help form-control-label">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help form-control-label">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help form-control-label">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a Username';
  }
  if (!values.categories) {
    errors.categories = 'Enter Categories';
  }
  if (!values.content) {
    errors.content = 'Enter some Content';
  }

  return errors;
}

// when user types something in... record it on application state
// reduxForm is similar to connect and can inject our action creator into our component and create a container
// difference:
// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToprops, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title','categories','content'],
  validate
}, null, { createPost })(PostsNew);
