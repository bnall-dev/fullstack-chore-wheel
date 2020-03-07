function mapChoresToRoommates({ roommateIds, choreIds }) {
  let rmStart = Math.floor(Math.random() * Math.floor(roommateIds.length));
  let choreStart = Math.floor(Math.random() * Math.floor(choreIds.length));
  const assigned = [];
  choreIds.map(choreId => {
    assigned.push({
      choreId: choreIds[choreStart],
      roommateId: roommateIds[rmStart],
    });
    if (rmStart === roommateIds.length - 1) {
      rmStart = 0;
    } else {
      rmStart++;
    }
    if (choreStart === choreIds.length - 1) {
      choreStart = 0;
    } else {
      choreStart++;
    }
  });
  rmStart = 0;
  choreStart = 0;
  return assigned;
}
module.exports = {
  mapChoresToRoommates,
};
