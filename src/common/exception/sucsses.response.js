export const succses_response = ({ res, message = "done", status = 200, data }) => {
    res.status(status).json({ message, data })
}