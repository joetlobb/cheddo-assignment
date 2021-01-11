import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.css';
import logo from './assets/logo.png';
import * as actions from './store/actions';
import * as types from './store/types';
// import { thunkSendMessage } from './store/thunks';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export class App extends Component<Props> {
  state = { input: '', isEditing: false, taskId: 0 };

  componentDidMount() {
    // this.props.onLoadTasks();
    // console.log('1')
  }

  inputChangeHandler = (taskName: string) => {
    this.setState({ input: taskName });
  };

  onCreateTask = (e: any) => {
    e.preventDefault();
    if (this.state.input !== '') {
      if (!this.state.isEditing) {
        this.props.onAddTask(this.state.input, this.state.isEditing);
      } else {
        this.props.onEditTask(this.state.input, this.state.taskId);
      }
      this.setState({ input: '', isEditing: false });
    }
    return;
  };

  onRemoveTask = () => {
    this.props.onRemoveTask(this.state.input, this.state.taskId);
    this.setState({ input: '', isEditing: false });
  };

  onEditTask = (taskName: string, id: number) => {
    this.setState({ input: taskName, isEditing: true, taskId: id });
  };

  render() {
    let todoLists = null;
    let tasks: any = {};
    tasks = this.props.taskList;
    todoLists = tasks.tasks.map((task: { title: string }, id: number) => (
      <p
        key={'task.title' + Math.random()}
        id="pList"
        onClick={() => this.onEditTask(task.title, id)}
      >
        {task.title}
      </p>
    ));

    let activityLists = null;
    let activities: any = {};
    activities = this.props.taskList;
    // activities = activities.logs;
    activityLists = activities.logs.map((activity: string, id: number) => (
      <p
        key={'activity' + Math.random()}
        id="pList"
        // onClick={() => this.onEditTask(task.title, id)}
      >
        {activity}
      </p>
    ));

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <img src={logo} alt="" width="60" height="60" id="logo-name"></img>
            <h4 id="logo-name">Cheddo Technology</h4>
          </div>
          <div className="col-12">
            <h5>Task Name</h5>
            <input
              type="text"
              placeholder="Create Task"
              value={this.state.input}
              onChange={(e) => this.inputChangeHandler(e.target.value)}
            ></input>
            {this.state.input !== '' ? <p id="typing">Typing...</p> : null}
            <button
              type="button"
              className="btn btn-warning"
              onClick={(e) => this.onCreateTask(e)}
            >
              {this.state.isEditing ? 'Edit' : 'Button'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onRemoveTask}
            >
              Delete
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="row justify-content-center">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <h5>Todo List</h5>
            <div id="list">{todoLists}</div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <h5>Activity List</h5>
            <div id="list">{activityLists}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: types.RootState) => {
  return {
    taskList: state.tasks,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<types.RootAction>) => {
  return {
    // onLoadTasks: () => dispatch(thunkSendMessage()),
    onAddTask: (taskName: string, isEditing: boolean) =>
      dispatch(actions.addTask(taskName, isEditing)),
    onEditTask: (taskName: string, taskId: number) =>
      dispatch(actions.editTask(taskName, taskId)),
    onRemoveTask: (taskName: string, taskId: number) =>
      dispatch(actions.removeTask(taskName, taskId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
