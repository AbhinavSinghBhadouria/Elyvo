import Problem from "../models/Problem.js";

export const addProblem = async (req, res) => {
    try {
        const problemData = req.body;
        
        if (!problemData.id || !problemData.title || !problemData.difficulty) {
            return res.status(400).json({ msg: "Missing required fields (id, title, difficulty)" });
        }

        const existingProblem = await Problem.findOne({ id: problemData.id });
        if (existingProblem) {
            return res.status(400).json({ msg: "Problem with this ID already exists" });
        }

        const newProblem = await Problem.create(problemData);
        res.status(201).json({ msg: "Problem added successfully", problem: newProblem });
    } catch (error) {
        console.error("Error in addProblem:", error.message);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

export const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProblem = await Problem.findOneAndUpdate({ id }, updateData, { new: true });
        if (!updatedProblem) {
            return res.status(404).json({ msg: "Problem not found" });
        }

        res.status(200).json({ msg: "Problem updated successfully", problem: updatedProblem });
    } catch (error) {
        console.error("Error in updateProblem:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProblem = await Problem.findOneAndDelete({ id });
        if (!deletedProblem) {
            return res.status(404).json({ msg: "Problem not found" });
        }
        res.status(200).json({ msg: "Problem deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProblem:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
