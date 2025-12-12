import LessonOneIntro from "./LessonOneIntro";
import LessonTwoIntro from "./LessonTwoIntro";
import LessonThree from "./LessonThree";
import LessonFourIntro from "./LessonFourIntro";
import LessonFiveIntro from "./LessonFiveIntro";

const LessonIntro = ({ lessonId }) => {
  switch (lessonId) {
    case "lesson-1":
      return <LessonOneIntro />;
    case "lesson-2":
      return <LessonTwoIntro />;
    case "lesson-3":
      return <LessonThree />;
    case "lesson-4":
      return <LessonFourIntro />;
    case "lesson-5":
      return <LessonFiveIntro />;
    default:
      return null;
  }
};

export default LessonIntro;
