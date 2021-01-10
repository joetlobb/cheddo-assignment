import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.css';
import logo from './assets/logo.png';
import { fetchTasks } from './store/actions';
import * as types from './store/types';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export class App extends Component<Props> {

  componentDidMount() {
    this.props.onInitIngredients();
    console.log(this.props);
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <img src={logo} alt="" width="60" height="60" id="logo-name"></img>
            <h4 id="logo-name">Cheddo Technology</h4>
          </div>
          <div className="col-12">
            <h5>Task Name</h5>
            <input type="text" placeholder="Create Task"></input>
            <button type="button" className="btn btn-warning">
              Button
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="row justify-content-center">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <h5>Todo List</h5>
            <p id="list">task 1</p>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <h5>Activity List</h5>
            <p id="list">task 1 - created</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {

};

const mapDispatchToProps = (dispatch: Dispatch<types.RootAction>) => {
  return {
    onInitIngredients: () => dispatch(fetchTasks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);