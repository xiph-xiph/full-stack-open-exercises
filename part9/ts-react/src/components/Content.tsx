import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part {...coursePart} />
      ))}
    </div>
  );
};

export default Content;
