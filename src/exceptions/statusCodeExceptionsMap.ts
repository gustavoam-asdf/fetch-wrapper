import { BadRequestException } from "./BadRequestException.js"
import { ConflictException } from "./ConflictException.js"
import { ForbiddenException } from "./ForbiddenException.js"
import { InternalServerErrorException } from "./InternalServerErrorException.js"
import { NotFoundException } from "./NotFoundException.js"
import { PayloadTooLargeException } from "./PayloadTooLargeException.js"
import { UnauthorizedException } from "./UnauthorizedException.js"

export const statusCodeExceptionsMap = new Map([
	[400, BadRequestException],
	[401, UnauthorizedException],
	[403, ForbiddenException],
	[404, NotFoundException],
	[409, ConflictException],
	[413, PayloadTooLargeException],
	[500, InternalServerErrorException],
])