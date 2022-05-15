db.trips.aggregate([
  {
    $group:
    {
      _id: {
        $dayOfWeek: "$startTime",
      },
      total:
      { $sum: 1 },
      inicio:
      {
        $push:
        "$startStationName",
      },
    },
  },
  {
    $sort:
    {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $unwind: "$inicio",
  },
  {
    $group:
    {
      _id: "$inicio",
      total:
      { $sum: 1 },
    },
  },
  {
    $sort:
    {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project:
    {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
]);
