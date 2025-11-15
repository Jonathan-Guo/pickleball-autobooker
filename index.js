const { runPickleballAutobooker } = require("./pickleballAutoBooker");

(async () => {
  await runPickleballAutobooker(
    "Monday",
    "8:00",
    "AM",
    "Pickleball Open Play: All Levels"
  );
})();
