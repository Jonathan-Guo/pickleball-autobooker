const { runPickleballAutobooker } = require("./pickleballAutoBooker");

(async () => {
  await runPickleballAutobooker(
    "Tuesday",
    "8:30",
    "PM",
    "Pickleball Open Play: Advanced, DUPR 4.0-4.4",
    "centreville"
  );
})();
