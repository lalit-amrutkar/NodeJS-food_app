const testController = (req, res) => {
    try {
        res.status(200).send("<h1>Testing routing</h1>");
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Something went wrong");
    }
};

module.exports = testController;
