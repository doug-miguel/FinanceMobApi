"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersGroups = GetUsersGroups;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function GetUsersGroups(req, res) {
    try {
        const { id_group } = req.query;
        const { id } = await req.jwtDecode();
        const whereConditions = {
            ...(id ? { id: id } : { user_id: id_group }),
        };
        const usesrGroups = await prisma.userGroup.findMany({
            where: whereConditions
        });
        return res.status(200).send(usesrGroups);
    }
    catch (error) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    ;
}
