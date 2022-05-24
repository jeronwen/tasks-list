import { TextField, Button, Checkbox } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ addTask }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [checkBoxValue, setCheckBoxValue] = React.useState(false);

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        checked={checkBoxValue}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onChange={() => setCheckBoxValue(!checkBoxValue)}
      />
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button
        onClick={() => {
          setInputValue("");
          setCheckBoxValue(false);
          addTask({ text: inputValue, checked: checkBoxValue });
        }}
      >
        <AddIcon />
      </Button>
    </div>
  );
};
