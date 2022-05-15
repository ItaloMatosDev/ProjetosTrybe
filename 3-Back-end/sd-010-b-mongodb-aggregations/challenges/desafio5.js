db.movies.aggregate(
  [
    {
      $match:
      {
        cast:
        {
          $exists: true,
        },
        countries:
        {
          $in: ["USA"],
        },
        "tomatoes.viewer.rating":
        {
          $gte: 3,
        },
      },
    },
    {
      $addFields: {
        num_fav:
        {
          $size:
          {
            $setIntersection:
            [["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"], "$cast"],
          },
        },
      },
    },
    {
      $sort:
      {
        num_fav: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
    {
      $project:
      {
        _id: 0,
        title: 1,
      },
    },
  ],
);
