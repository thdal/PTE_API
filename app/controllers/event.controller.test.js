import eventController from "./event.controller.js";
import event from "../models/event.model.js";
import sql from "../models/db.js"

const mockRequest = () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    return req
}

const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}
jest.mock('../models/event.model.js');

jest.mock('../models/db.js', ()=>{
    return jest.fn();
});
describe('Test create into event controller :', () => {
    beforeEach(()=>{
        event.mockClear();
    });
    test('Testing 404 error has been called :', () => {
        let req = mockRequest();
        req.body = null;
        const res = mockResponse();
        const result = eventController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({message: 'Content can not be empty!'});
    });

    test('Testing create model has been called', async() => {
        let req = mockRequest();
        const res = mockResponse();
        const result = eventController.create(req,res);
        expect(event.create).toHaveBeenCalled();
    });
});
