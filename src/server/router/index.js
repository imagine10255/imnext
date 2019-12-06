const express = require('express');
const newsData = require('../../services/mock/news/getNewsList');

const router = express.Router();
const exampleResponseData = {
    statusCode: null,
    message: null,
    data: {},
};

/**
 * 取得最新消息明細
 */
router.get('/api/news/:id', async (req, res) => {
    const responseData = Object.assign(exampleResponseData, {
        data: newsData.find(row => String(row.id) === req.params.id),
    });

    res.status(200).json(responseData);
});

/**
 * 取得最新消息列表
 */
router.get('/api/news', async (req, res) => {
    const responseData = Object.assign(exampleResponseData, {
        data: {
            rows: newsData,
        },
    });

    res.status(200).json(responseData);
});

module.exports = router;