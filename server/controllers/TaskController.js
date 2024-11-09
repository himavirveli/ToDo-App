import { emptyORows } from '../helpers/utils.js'
import { insertTask, selectAlltasks, removeTask } from '../models/Task.js'

const getTasks = async (req, res, next) => {
    try {
        const result = await selectAlltasks()
        return res.status(200).json(emptyORows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.length === 0) {
            const error = new Error('Invalid description for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description) 
        return res.status(200).json({id: result.rows[0].id})
        } catch (error) {
            return next(error);
        }
    }

const deleteTask = async (req,res,next) => {
    try {
        const { id } = req.params;
        const result = await removeTask(id);
        if (result.rowCount === 0) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            return next(error);
        }
        return res.status(200).json({ id: id }); 
    } catch (error) {
        return next(error);

    }

}

export { getTasks, postTask, deleteTask }