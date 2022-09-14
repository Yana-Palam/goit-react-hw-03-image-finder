import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import { Header, SearchForm, Button, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('Enter a search query!');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BsSearch size="24" />
          </Button>

          <Input
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={query}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;
