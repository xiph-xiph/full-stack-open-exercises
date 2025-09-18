import type { CoursePart } from "../types";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <div>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.description}</i>
          </div>
          <br />
        </div>
      );
    case "group":
      return (
        <div>
          <div>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </div>
          <div>project exercises {props.groupProjectCount}</div>
          <br />
        </div>
      );
    case "background":
      return (
        <div>
          <div>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.description}</i>
          </div>
          <div>
            more info:{" "}
            <a href={props.backgroundMaterial}>{props.backgroundMaterial}</a>
          </div>
          <br />
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <b>
              {props.name} {props.exerciseCount}
            </b>
          </div>
          <div>
            <i>{props.description}</i>
          </div>
          <div>required skills: {props.requirements.join(", ")}</div>
          <br />
        </div>
      );
    default:
      return null;
  }
};

export default Part;
