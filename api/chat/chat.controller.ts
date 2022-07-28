const chatService = require('./chat.service.js');
const logger = require('../../services/logger.service')
import { Chat } from '../../models/chat.model'


async function getChats(req, res) {
    try {
        logger.debug('Getting Boards???')
        var queryParams = req.query;
        const boards = await chatService.query(queryParams)
        // logger.debug('Getting Boards???', boards)

        res.json(boards);
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getchatById(req, res) {
    try {
        // console.log(req)
        const chatId = req.params.id;
        const chat = await chatService.getById(chatId)
        res.json(chat)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}


async function updateBox(req, res) {
    try {
        const newBox = req.body
        const boardId = req.params.id
        const board = await chatService.getById(boardId)
        const newBoard = await chatService.updateBox(board, newBox)
        const updatedBoard = await chatService.update(newBoard)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to add/update box', err)
        res.status(500).send({ err: 'Failed to add/update box' })
    }
}

async function updateTask(req, res) {
    try {
        const newTask = req.body
        const boardId = req.params.id
        const board = await chatService.getById(boardId)
        const currBoxId = req.params.boxId
        const newBoard = await chatService.updateTask(board, currBoxId, newTask)
        const updatedBoard = await chatService.update(newBoard)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update task', err)
        res.status(500).send({ err: 'Failed to update task' })
    }
}

async function deleteTask(req, res) {
    try {
        const boardId = req.params.id
        const boxId = req.params.boxId
        const taskId = req.params.taskId
        const newBoard = await chatService.deleteTask(boardId, boxId, taskId)
        const updatedBoard = await chatService.update(newBoard)
        res.json(updatedBoard)

    } catch (err) {

    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await chatService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}


async function addBoard(req, res) {
    try {
        const board = req.body;
        const addedBoard = await chatService.add(board)
        res.json(addedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function removeBoard(req, res) {
    try {
        const boardId = req.params.id
        const removedId = await chatService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

module.exports = {
    getChats,
    getchatById,
    addBoard,
    updateBoard,
    updateTask,
    updateBox,
    removeBoard,
    deleteTask
}
