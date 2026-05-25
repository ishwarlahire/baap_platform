import * as service from "../services/projectType.service"; 
import { FastifyRequest, FastifyReply } from "fastify";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await service.createProjectType(req.body);
        reply.status(201).send({
            success: true,
            data
        });
    } catch (err: any) {
        reply.status(400).send({
            success: false,
            message: err.message
        });
    }
};

export const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await service.getAllProjectTypes();
        reply.send({
            success: true,
            data
        });
    } catch (err: any) {
        reply.status(500).send({
            success: false,
            message: err.message
        });
    }
};

export const getById = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = req.params as { id: string };
        const data = await service.getProjectTypeById(id);
        reply.send({
            success: true,
            data
        });
    } catch (err: any) {
        reply.status(404).send({
            success: false,
            message: err.message
        });
    }
};


export const update = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = req.params as { id: string };
        const data = await service.updateProjectType(id, req.body);
        reply.send({
            success: true,
            data
        });
    } catch (err: any) {
        reply.status(400).send({
            success: false,
            message: err.message
        });
    }
};


export const remove = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = req.params as { id: string };
        const data = await service.deleteProjectType(id);
        reply.send({
            success: true,
            data
        });
    } catch (err: any) {
        reply.status(404).send({
            success: false,
            message: err.message
        });
    }
};