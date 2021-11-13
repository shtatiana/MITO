import express from "express";
import multer from "multer";
import path from "path";
import imageSize from "image-size";

const app = express();
    const CORS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept'
    };
    const login = 'tatiana.shirshikova';

    const img = multer({
      dest: "./img",
    });

    app
    .all('/login/', (req, resp) => {
        resp.set(CORS);
        resp.send(login);
        })

      .get("/", function (req, resp) {
            const tempPath1 = path.resolve();
            resp.sendFile(path.join(tempPath1, "/public/index.html"));
        })
      .post("/size2json/",
        img.single("image"), async (resp) => {
        const tempPath = resp.file.path;

            const dimensions = imageSize(tempPath);
            
            resp.res.set(CORS);
            resp.res.send({width: dimensions.width, height: dimensions.height});
          },
        )
      .listen(process.env.PORT || 4321);
