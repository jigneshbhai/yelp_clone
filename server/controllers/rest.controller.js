let db;
import("../db/index.js")
  .then((dbModule) => {
    db = dbModule.default;
  })
  .catch((error) => {
    console.error("Error loading DB module:", error);
  });

export const getAllRest = async (req, res, next) => {
  try {
    const restData = await db.query("select * from rest;");

    res.status(200).json({
      status: "success",
      results: restData.rows.length,
      data: {
        restaurants: restData.rows,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleRest = async (req, res, next) => {
  try {
    const rest = await db.query("select * from rest where id = $1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        rest: rest.rows[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createRest = async (req, res, next) => {
  try {
    const newRest = await db.query(
      "INSERT INTO rest (name, location, price_range) VALUES ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      data: {
        rest: newRest.rows[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateRest = async (req, res, next) => {
  try {
    const updateRest = await db.query(
      "UPDATE rest SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        rest: updateRest.rows[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRest = async (req, res, next) => {
  try {
    const result = await db.query("DELETE FROM rest where id = $1", [
      req.params.id,
    ]);
     res.status(204).json({
       status: "success",
     });
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  res.send("hello");
};
