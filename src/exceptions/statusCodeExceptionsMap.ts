import { BadRequestException } from "./BadRequestException"
import { InternalServerErrorException } from "./InternalServerErrorException"
import { NotFoundException } from "./NotFoundException"
import { UnauthorizedException } from "./UnauthorizedException"

export const statusCodeExceptionsMap = new Map([
	[400, BadRequestException],
	[401, UnauthorizedException],
	[404, NotFoundException],
	[500, InternalServerErrorException],
])