import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import React from "react";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

const initialState = [{ id: 0, text: "Задача №1", checked: false }];
function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [...state, { id: action.payload.idState, ...action.payload.value }];
  }
  if (action.type === "DELETE_TASK") {
    return state.filter((item) => item.id !== action.payload);
  }
  if (action.type === "CHECK_TASK") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, checked: action.payload.checked };
      }
      return item;
    });
  }

  if (action.type === "DELETE_ALL") {
    return state.filter((item, index) => item.id !== index);
  }
  if (action.type === "CHECK_ALL") {
    return state.map((item) => {
      return { ...item, checked: !item.checked };
    });
  }

  return state;
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [boolean, setBoolean] = React.useState(false);
  //const [fds]

  const addTask = (value) => {
    let idState;
    if (state.length === 0) {
      idState = 0;
    } else {
      idState = state[state.length - 1].id + 1;
    }
    dispatch({
      type: "ADD_TASK",
      payload: { idState, value },
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

  const deleteAll = () => {
    dispatch({
      type: "DELETE_ALL",
    });
  };

  const checkAll = (e) => {
    dispatch({
      type: "CHECK_ALL",
    });
    setBoolean(!boolean);
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
          <Button onClick={checkAll}>
            {boolean ? "Снять отметки" : "Отметить всё"}
          </Button>
          <Button onClick={deleteAll}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
