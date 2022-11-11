import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Task = ({
  description,
  completed,
  date,
  onLabel,
  onDelete,
  partNum: id,
  fullTime: localTime,
  timerProps,
  min,
  sec,
}) => {
  const initialState = {
    id: null,
    date: "5 min ago",
  };

  const [taskDataState, setTaskDataState] = useState(initialState);
  const [timerTask, setTimerTask] = useState(null);

  useEffect(() => {
    setTaskDataState((taskDataState) => {
      return { ...taskDataState, id };
    });
  }, [id]);

  useEffect(() => () => clearInterval(timerTask), [timerTask]);

  const degreeseTimer = () => {
    let sec = localTime % 60;
    let min = Math.floor(localTime / 60);
    if (localTime >= 0) {
      timerProps(taskDataState.id, min, sec, --localTime);
    }
  };

  const timerControlers = (e) => {
    let button = e.target;
    if (button.className === "icon-timer icon-pause") {
      clearInterval(timerTask);
      setTimerTask(null);
      timerProps(taskDataState.id, min, sec, localTime);
    }
    if (button.className === "icon-timer icon-play") {
      if (!timerTask) {
        setTimerTask(setInterval(degreeseTimer, 1000));
        timerTask;
      }
    }
  };
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onChange={onLabel}
        checked={completed}
      />
      <label>
        <span className="description">{description}</span>
        <span className="timer-buttons">
          <button
            id={`${id}icon-play`}
            className="icon-timer icon-play"
            onClick={timerControlers}
          ></button>
          <button
            id={`${id}icon-pause`}
            className="icon-timer icon-pause"
            onClick={timerControlers}
          ></button>
          <span className="time">
            {min}:{sec}
          </span>
        </span>
        <span className="created">
          {formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </div>
  );
};

export default Task;
