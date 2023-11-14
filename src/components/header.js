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
      <div className="text-xl font-bold mx-8" style={{ color: "#2988A6" }}>
        Hello Lidia,
      </div>
      <div className="flex flex-col space-y-1 border-black border-t border-b w-screen py-3">
        <div className="flex space-x-4 flex-wrap mx-8">
          <div
            className=" rounded-lg px-2 text-sm"
            style={{ backgroundColor: "#F0F294" }}
          >
            {currentDate}
          </div>
          <div
            className="rounded-lg px-2 text-sm"
            style={{ backgroundColor: "#F2CD94" }}
          >
            Phase I
          </div>
        </div>
        <div className="flex space-x-4 flex-wrap mx-8">
          <div
            className="rounded-lg px-2 mt-2 text-sm"
            style={{ backgroundColor: "#D6D7BE" }}
          >
            {currentTime}
          </div>
          <div
            className="rounded-lg px-2 mt-2 text-sm"
            style={{ backgroundColor: "#94C5F2" }}
          >
            Task 1/2
          </div>
        </div>
      </div>
    </>
  );
};
