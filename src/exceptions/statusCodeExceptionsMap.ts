import { BadRequestException } from "./BadRequestException.js"
import { ConflictException } from "./ConflictException.js"
import { InternalServerErrorException } from "./InternalServerErrorException.js"
import { NotFoundException } from "./NotFoundException.js"
import { UnauthorizedException } from "./UnauthorizedException.js"

export const statusCodeExceptionsMap = new Map([
	[400, BadRequestException],
	[401, UnauthorizedException],
	[404, NotFoundException],
	[409, ConflictException],
	[500, InternalServerErrorException],
])