import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import './App.css';
import logo from './assets/logo.png';

import { AppState } from './store/rootStore';
import { AppActions } from './store/models/actions';

import { Task } from './store/tasks/models/task';
import { boundRequestTasks, addTask, editTask, removeTask } from './store/tasks/TaskAction';

interface Props {};

interface LinkStateProps {
  tasks: Task[];
  logs?: [{method: string, title: string}];
};

interface LinkDispatchProps {
  boundRequestTasks: () => void;
  addTask: (taskName: string) => void;
  editTask: (taskName: string, taskId: number) => void;
  removeTask: (taskName: string, taskId: number) => void;
};

type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    tasks: state.taskReducer.tasks,
    logs: state.taskReducer.logs,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AppActions>
) => {
  return {
    boundRequestTasks: bindActionCreators(boundRequestTasks, dispatch),
    addTask: bindActionCreators(addTask, dispatch),
    editTask: bindActionCreators(editTask, dispatch),
    removeTask: bindActionCreators(removeTask, dispatch)
  };
};

class App extends Component<LinkProps> {
  state = { input: '', isEditing: false, taskId: 0 };

  componentDidMount() {
    this.props.boundRequestTasks();
  }

  inputChangeHandler = (taskName: string) => {
    this.setState({ input: taskName });
  };

  onCreateTask = () => {
    if (this.state.input !== '') {
      if (!this.state.isEditing) {
        this.props.addTask(this.state.input);
      } else {
        this.props.editTask(this.state.input, this.state.taskId);
      }
      this.setState({ input: '', isEditing: false });
    }
    return;
  };

  onRemoveTask = () => {
    this.props.removeTask(this.state.input, this.state.taskId);
    this.setState({ input: '', isEditing: false });
  };

  onEditTask = (taskName: string, id: number) => {
    this.setState({ input: taskName, isEditing: true, taskId: id });
  };

  render() {
    let taskList: any = [];
    if (this.props.tasks) {
      const { tasks } = this.props;
      taskList = tasks.map((task: Task, id: number) => (
        <p
          key={'task.title' + Math.random()}
          id="pList"
          onClick={() => this.onEditTask(task.title, id)}
        >
          {`${id + 1}. ${task.title}`}
        </p>
      ));
    }

    let activityLists: any = [];
    if (this.props.logs) {
      const { logs } = this.props;
      const logLists: any = logs;
      activityLists = logLists.map((activity: {method: string, title: string}, id: number) => (
        <p
          key={'activity' + Math.random()}
          id="pList"
        ><span className={activity.method === 'create' ? 'spanCreate' 
        : activity.method === 'update' ? 'spanEdit' : 'spanRemove'}>{activity.method}</span>
          {' - ' + activity.title}
        </p>
      ));
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <img src={logo} alt="" width="60" height="60" id="logo-name"></img>
            <h4 id="logo-name">Cheddo Technology</h4>
            <p style={{border: '1px solid #ccc', margin: '0 120px', boxShadow: '1px 2px #ccc'}}>Created by Gulyapas Poonkawinsiri. <a href="https://github.com/joetlobb/React-Front-End-Test">Github Source Code</a></p>
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
              onClick={this.onCreateTask}
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
            <div id="list">{taskList}</div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <h5>Activity List</h5>
            <div id="list">{activityLists}</div>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
