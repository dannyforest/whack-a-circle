

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    function getRandomShape() {
        const shapes = ['circle', 'square', 'diamond', 'triangle'];
        const randomIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomIndex];
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomDimensions(minWidth, maxWidth, minHeight, maxHeight) {
        const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        return { width, height };
    }

    function getRandomAngle(minAngle = 0, maxAngle = 360) {
        return Math.floor(Math.random() * (maxAngle - minAngle + 1)) + minAngle;
    }



    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify({
            shape: getRandomShape(),
            color: getRandomColor(),
            dimensions: getRandomDimensions(50, 500, 50, 500),
            angle: getRandomAngle()
        }),
    };
};
