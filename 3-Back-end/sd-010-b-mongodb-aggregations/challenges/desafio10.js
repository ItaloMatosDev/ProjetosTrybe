db.trips.aggregate([
  {
    $project:
    {
      _id: 0,
      usertype: 1,
      startTime: 1,
      stopTime: 1,
      diferenca: {
        $divide:
        [
          {
            $subtract:
            ["$stopTime", "$startTime"],
          },
          3600000,
        ],
      },
    },
  },
  {
    $group:
    {
      _id: "$usertype",
      duracao:
      {
        $avg: "$diferenca",
      },
    },
  },
  {
    $project:
    {
      tipo: "$_id",
      duracaoMedia: {
        $round:
        ["$duracao", 2],
      },
      _id: 0,
    },
  },
  {
    $sort:
    {
      duracaoMedia: 1,
    },
  },
]);
