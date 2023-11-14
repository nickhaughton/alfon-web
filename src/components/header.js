// Function to format a JavaScript Date object into a string "Month day, year"
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Function to format a JavaScript Date object into a string "hour:minutes AM/PM"
function formatTime(date) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString("en-US", options);
}

export const Header = () => {
  // Example usage:
  const now = new Date();

  // Get the formatted date and time
  const currentDate = formatDate(now);
  const currentTime = formatTime(now);

  return (
    <>
      <div className="text-xl font-bold">Hello Lidia,</div>
      <div className="flex flex-col space-y-1 border-t-1 border border-b-1">
        <div className="flex space-x-4 flex-wrap">
          <div className="bg-yellow-500 rounded-lg px-2 mt-2 ">
            {currentDate}
          </div>
          <div className="bg-yellow-500 rounded-lg px-2 mt-2">Phase I</div>
        </div>
        <div className="flex space-x-4 flex-wrap">
          <div className="bg-yellow-500 rounded-lg px-2 mt-2">
            {currentTime}
          </div>
          <div className="bg-yellow-500 rounded-lg px-2 mt-2">Task 1/2</div>
        </div>
      </div>
    </>
  );
};
