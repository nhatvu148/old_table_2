import projects from "./ProjectObj";
import subObjects from "./SubObj";

export const reducer = (state, action) => {
  switch (action.type) {
    case "selectionpjid":
      return state.map((obj, idx) => {
        if (idx === action.rowIndex) {
          obj.selectedProjectId = action.value;
          obj.selectedProjectName = projects[action.value];
        }
        return obj;
      });

    case "selectionpjname":
      return state.map((obj, idx) => {
        if (idx === action.rowIndex) {
          obj.selectedProjectName = action.value;
          obj.selectedProjectId = Object.keys(projects).find(
            key => projects[key] === action.value
          );
        }
        return obj;
      });

    case "selectionsubid":
      return state.map((obj, idx) => {
        if (idx === action.rowIndex) {
          obj.selectedSubId = action.value;
          obj.selectedSubName = subObjects[action.value];
        }
        return obj;
      });

    case "selectionsubname":
      return state.map((obj, idx) => {
        if (idx === action.rowIndex) {
          obj.selectedSubName = action.value;
          obj.selectedSubId = Object.keys(subObjects).find(
            key => subObjects[key] === action.value
          );
        }
        return obj;
      });

    case "starttime":
      return state.map((obj, idx) => {
        if (idx === action.rowIndex) {
          obj.startTime = action.value;
          if (obj.endTime) {
            if (obj.startTime === null) {
              obj.workTime = "00:00";
            } else {
              const startHr = Number(obj.startTime.toString().slice(16, 18));
              const startMin = Number(obj.startTime.toString().slice(19, 21));
              const endHr = Number(obj.endTime.toString().slice(16, 18));
              const endMin = Number(obj.endTime.toString().slice(19, 21));

              const _d = (endHr - startHr) * 60 + endMin - startMin;
              const dHr = Math.floor(_d / 60);
              const dMin = _d % 60;

              const dHR = dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
              const dMIN =
                dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

              obj.workTime = `${dHR}:${dMIN}`;
            }
          }
        }
        return obj;
      });

    case "endtime":
      return state.map((obj, idx, arr) => {
        if (idx === action.rowIndex) {
          obj.endTime = action.value;
          if (obj.startTime) {
            if (obj.endTime === null) {
              obj.workTime = "00:00";
            } else {
              const startHr = Number(obj.startTime.toString().slice(16, 18));
              const startMin = Number(obj.startTime.toString().slice(19, 21));
              const endHr = Number(obj.endTime.toString().slice(16, 18));
              const endMin = Number(obj.endTime.toString().slice(19, 21));

              const _d = (endHr - startHr) * 60 + endMin - startMin;
              const dHr = Math.floor(_d / 60);
              const dMin = _d % 60;

              const dHR = dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
              const dMIN =
                dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

              obj.workTime = `${dHR}:${dMIN}`;
            }
          }
          if (
            state[action.rowIndex + 1] &&
            (arr[idx + 1].startTime === null ||
              arr[idx + 1].startTime < obj.endTime)
          ) {
            arr[idx + 1].startTime = obj.endTime;
          }
        }
        return obj;
      });

    case "addrow":
      return [...state, action.newData];

    case "deleterow":
      return state.filter(item => item.key !== action.key);

    default:
      return state;
  }
};
