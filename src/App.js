import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import React from "react";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

const initialState = [{ id: 0, text: "Задача №1", checked: false }];
function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    let idState;
    if (state.length == 0) {
      idState = 0;
    } else {
      idState = state[state.length - 1].id + 1;
    }
    return [...state, { id: idState, ...action.payload }];
  }
  if (action.type === "DELETE_TASK") {
    return state.filter((item) => {
      if (item.id !== action.payload) {
        return item;
      } else {
        return;
      }
    });
  }
  if (action.type === "CHECK_TASK") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, checked: action.payload.checked };
      }
    });
  }
  return state;
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addTask = (value) => {
    dispatch({
      type: "ADD_TASK",
      payload: value,
    });
  };
  const checkTask = (value) => {
    dispatch({
      type: "CHECK_TASK",
      payload: value,
    });
  };
  const deleteTask = (value) => {
    dispatch({
      type: "DELETE_TASK",
      payload: value,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((data) => (
            <Item
              key={data.id}
              text={data.text}
              checkedItem={data.checked}
              checkTask={checkTask}
              deleteTask={deleteTask}
              id={data.id}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
