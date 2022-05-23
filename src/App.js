import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import React from "react";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

const initialState = [{ id: 0, text: "Задача №1", checked: false }];
function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      { id: state[state.length - 1].id + 1, ...action.payload },
    ];
  }
  if (action.type === "CHECK_TASK") {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, checked: action.payload.checked };
      }
      return item;
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

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask} stateId={state[Array.length - 1].id} />
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
