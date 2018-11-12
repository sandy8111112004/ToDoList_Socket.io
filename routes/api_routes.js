
const ToDoDB = require("../data/list.js");



module.exports = function (app) {
    app.get('/api/list', function (req, res) {
        ToDoDB.find({}).then(
            function (dbToDo) {
                res.json(dbToDo);
            }
        ).catch(
            function (err) {
                res.json(err);
            }
        );
    });

    app.post('/api/list', function (req, res) {
        ToDoDB.create(req.body).then(
            function (dbToDo) {
                res.json(dbToDo);
            }
        ).catch(
            function (err) {
                res.json(err);
            }
        );

    });


    // app.delete('/api/list', function (req, res) {
    //     ToDoDB.deleteOne(req.body).then(
    //         function () {
    //             res.json({success: true});
    //         }
    //     ).catch(
    //         function (err) {
    //             res.json(err);
    //         }
    //     )
    // });


    app.put('/api/list', function (req, res) {
        ToDoDB.findOne(req.body)
            .then(
                function (data) {
                    const status = data.inputBox;
                    if (status){
                        ToDoDB.deleteOne(req.body).then(
                            function () {
                                res.json({success: true});
                            }
                        ).catch(
                            function (err) {
                                res.json(err);
                            }
                        )

                    }else{
                        ToDoDB.updateOne(req.body, { inputBox: !status })
                            .then(
                                function (data) {
                                    res.json(data);
                                }
                            ).catch(
                                function (err) {
                                    res.json(err);
                                }
                            );
                    }
                }
            );

    });


    //////////////////////////////html//

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });


}