import React, { Component } from 'react'
import { Form, Container, Button, Message, Dropdown } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { COUNTRY_OPTIONS } from './countriesData.js'

class WriteArticle extends Component {
  state = {
    id: '',
    title: '',
    ingress: '',
    body: '',
    image: '',
    written_by: '',
    category_id: '',
    redirect: '',
    errors: '',
    categories: [],
    country: '',
    city: ''
  }

  componentDidMount() {
    axios.get('/api/v1/categories').then(response => {
      this.setState({ categories: response.data });
    });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const path = '/api/v1/articles'
    const payload = { ...this.state }
    axios.post(path, payload)
      .then(response => {
        setTimeout(() => {
          this.setState({
            redirect: true,
            id: response.data.article_id
          })
        }, 5000);
      })
      .catch(error => {
        setTimeout(() => {
          this.setState({
            redirect: false,
            errors: error.response.data.error
          })
        })  
      })
  }

  handleChangeCategory = (e, { value }) => {
    this.setState({ category_id: value })
  }

  handleChangeCountry = (e, { value }) => {
    this.setState({ country: value })
  } 

  render() {
    let message

    const options = this.state.categories.map(category => {
      return { key: category.id, text: category.name, value: category.id }
    })

    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/full-article',
        state: {
          id: this.state.id,
          message: true
        }
      }} />

    } else if (this.state.redirect === false) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your article could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        </>
      )
    }

    return (
      <>
        <Container>
          <p>{message}</p>
          <Form type="medium" id="write-article" onSubmit={this.onSubmit}>
            <Form.Input
              id="title"
              value={this.state.title}
              onChange={this.onChangeHandler}
              placeholder="Title"
            />
            <Form.TextArea
              id="ingress"
              value={this.state.ingress}
              onChange={this.onChangeHandler}
              placeholder="Ingress"
            />
            <Form.TextArea
              id="body"
              value={this.state.body}
              onChange={this.onChangeHandler}
              placeholder="Body"
            />
            <Form.Input
              id="written_by"
              value={this.state.written_by}
              onChange={this.onChangeHandler}
              placeholder="Written By"
            />
            <Form.Input
              id="image"
              value={this.state.image}
              onChange={this.onChangeHandler}
              placeholder="https://image.com"
            />
            <Dropdown
              clearable
              search
              selection
              placeholder="Select Category"
              options={options}
              id="category_select"
              onChange={this.handleChangeCategory}
            />
            <br></br>
            <br></br>
            <Dropdown
              clearable
              search
              selection
              placeholder="Select Country"
              options={COUNTRY_OPTIONS}
              id="select_country"
              onChange={this.handleChangeCountry}
            />
            <br></br>
            <br></br>
            <Form.Input
              id="city"
              value={this.state.city}
              onChange={this.onChangeHandler}
              placeholder="City Name"
            />
            <br></br>
            <br></br>
            <Button id="create">Create Article</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default WriteArticle
