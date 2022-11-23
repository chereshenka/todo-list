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
}) => {
  const [taskDataState, setTaskDataState] = useState({
    id: id,
    date: "5 min ago",
  });
  const [totalTime, setTotalTime] = useState(localTime);

  const [timerTask, setTimerTask] = useState(null);

  useEffect(() => {
    setTaskDataState((taskDataState) => {
      return { ...taskDataState, id };
    });
  }, [id]);

  //update timer or update app state
  useEffect(() => {
    if (!totalTime) {
      timerProps(taskDataState.id, 0, 0, totalTime);
    }
  }, [totalTime]);

  //update time if unmount task
  useEffect(() => {
    return () => {
      setTotalTime((t) => t);
    };
  }, []);

  useEffect(() => () => clearInterval(timerTask), [timerTask]);

  const degreeseTimer = () => {
    setTotalTime((time) => {
      if (!time) {
        clearInterval(timerTask);
        setTimerTask(null);
        return time;
      } else {
        return time - 1;
      }
    });
  };

  const timerControlers = (e) => {
    let button = e.target;
    if (button.className === "icon-timer icon-pause") {
      clearInterval(timerTask);
      setTimerTask(null);
      timerProps(
        taskDataState.id,
        Math.floor(totalTime / 60),
        totalTime % 60,
        totalTime,
      );
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
            {Math.floor(totalTime / 60)}:{totalTime % 60}
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
